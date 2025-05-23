const METRIC_TYPE = {
  DISTANCE: ['m', 'cm', 'in', 'ft', 'yd'],
  TEMPERATURE: ['c', 'f', 'k'],
};

const DISTANCE_CONVERSIONS = {
  m: {
    m: 1,
    cm: 100,
    in: 39.3701,
    ft: 3.28084,
    yd: 1.09361,
  },
  cm: {
    m: 0.01,
    cm: 1,
    in: 0.393701,
    ft: 0.0328084,
    yd: 0.0109361,
  },
  in: {
    m: 0.0254,
    cm: 2.54,
    in: 1,
    ft: 0.0833333,
    yd: 0.0277778,
  },
  ft: {
    m: 0.3048,
    cm: 30.48,
    in: 12,
    ft: 1,
    yd: 0.333333,
  },
  yd: {
    m: 0.9144,
    cm: 91.44,
    in: 36,
    ft: 3,
    yd: 1,
  },
};

const TEMPERATURE_CONVERSIONS = {
  c: {
    c: (v) => v,
    f: (v) => v * 9 / 5 + 32,
    k: (v) => v + 273.15,
  },
  f: {
    c: (v) => (v - 32) * 5 / 9,
    f: (v) => v,
    k: (v) => (v - 32) * 5 / 9 + 273.15,
  },
  k: {
    c: (v) => v - 273.15,
    f: (v) => (v - 273.15) * 9 / 5 + 32,
    k: (v) => v,
  },
};


module.exports = {
  METRIC_TYPE,
  DISTANCE_CONVERSIONS,
  TEMPERATURE_CONVERSIONS,
};
