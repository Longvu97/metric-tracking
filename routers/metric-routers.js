const express = require('express');
const router = express.Router();
const MetricService = require('../services/Metric');
const validator = require('express-joi-validation').createValidator({});
const { create, list, chart } = require('../middlewares/metric');

const metricService = new MetricService();

router.post('', validator.body(create), async (req, res) => {
  try {  
    const { body, headers } = req;
    const result = await metricService.create(body, headers.user);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json(jsonError('Create metric failed'));
  }
});

router.get('', validator.query(list), async (req, res) => {
  try {
    const { query, headers } = req;
    const result = await metricService.list(query.type, query.unit, headers.user);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json(jsonError('Get metric failed'));
  }
});

router.get('/chart', validator.query(chart), async (req, res) => {
  try {
    const { query, headers } = req;
    const result = await metricService.chart(query.type, query.unit, query.timePeriod, headers.user);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.json(jsonError('Get metric failed'));
  }
});

module.exports = {
  path: 'metrics',
  router
};
