const Joi = require('joi');
const { METRIC_TYPE } = require('../utils/const');

function checkUnit(value, helpers) {
  const { type, unit } = value;
  if (unit && !METRIC_TYPE[type.toUpperCase()]?.includes(unit)) {
    return helpers.message(`Invalid unit "${unit}" for type "${type}"`);
  }

  return value;
}

const create = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': 'Date must be in YYYY-MM-DD format',
    }),
  value: Joi.number().required(),
  unit: Joi.string().required().valid('m', 'cm', 'in', 'ft', 'yd', 'c', 'f', 'k'),
});

const list = Joi.object({
  type: Joi.string().valid(...Object.keys(METRIC_TYPE).map(key => key.toLowerCase())).required(),
  unit: Joi.string().optional(),
}).custom(checkUnit);

const chart = Joi.object({
  type: Joi.string().valid(...Object.keys(METRIC_TYPE).map(key => key.toLowerCase())).required(),
  unit: Joi.string().optional(),
  timePeriod: Joi.string().valid('1', '2').required(),
}).custom(checkUnit);

module.exports = {
  create,
  list,
  chart,
};
