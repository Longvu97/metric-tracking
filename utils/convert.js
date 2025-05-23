const { DISTANCE_CONVERSIONS, TEMPERATURE_CONVERSIONS } = require("./const");

function convertDistance(value, from, to) {
  return value * DISTANCE_CONVERSIONS[from][to];
}

function convertTemperature(value, from, to) {
  return TEMPERATURE_CONVERSIONS[from][to](value);
}

module.exports = { convertDistance, convertTemperature };
