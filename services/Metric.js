const dayjs = require('dayjs');

const Metric = require('../models/Metric');
const { METRIC_TYPE } = require('../utils/const');
const { convertDistance, convertTemperature } = require('../utils/convert');

const CONVERT_ACTIONS = {
  distance: convertDistance,
  temperature: convertTemperature,
};

function convertValueMetric(metrics, unit) {
  metrics.forEach((metric) => {
    if (metric.unit !== unit) {
      metric.value = CONVERT_ACTIONS[metric.type](metric.value, metric.unit, unit);
      metric.unit = unit;
    }
  });
}

class MetricService {
  /**
   * Create metric
   * 
   * @param {Object} body
   * @param {string} userId
   * 
   * @returns {Object}
   */
  async create(body, userId) {
    const { date, value, unit } = body;
    const type = Object.keys(METRIC_TYPE).find((key) => METRIC_TYPE[key].includes(unit)).toLowerCase();
    const formattedDate = dayjs(date).format('YYYY-MM-DDTHH:mm:ss');

    const isExist = await Metric.findOne({ date: formattedDate, type, userId });
    if (isExist) return jsonError('Metric is exist');
    
    const metric = new Metric({ date: formattedDate, value, unit, type, userId });
    await metric.save();

    return jsonSuccess(metric);
  }

  /**
   * Get list metrics by type
   * 
   * @param {string} type
   * @param {string} unit
   * @param {string} userId
   *
   * @returns {Object[]}
   */
  async list(type, unit, userId) {
    const metrics = await Metric.find({ type, userId }, { __v: 0 });    
    if (unit) {
      convertValueMetric(metrics, unit);
    }
    
    return jsonSuccess(metrics);
  }

  /**
   * Get list metrics for chart
   * 
   * @param {string} type
   * @param {string} unit
   * @param {string} timePeriod
   * @param {string} userId
   * 
   * @returns {Object[]}
   */
  async chart(type, unit, timePeriod, userId) {
    const currentDate = dayjs().endOf('day').toDate();
    const startDate = dayjs().subtract(timePeriod, 'M').startOf('day').toDate();
    const metrics = await Metric.aggregate([
      {
        $match: {
          type,
          userId,
          date: {
            $gte: new Date(startDate),
            $lte: new Date(currentDate),
          },
        },
      },
      { $sort: { date: -1 }},
      {
        $group: {
          _id: { day: { $dateToString: { format: "%Y-%m-%d", date: "$date", timezone: "+07:00" } } },
          doc: { $first: "$$ROOT" }
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
      { $project: { __v: 0 } },
      { $sort: { date: -1 } }
    ]);
    if (unit) {
      convertValueMetric(metrics, unit);
    }

    return jsonSuccess(metrics);
  }
}

module.exports = MetricService;
