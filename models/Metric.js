const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  value: { type: Number, required: true },
  type: { type: String, required: true, enum: ['distance', 'temperature'] },
  unit: { type: String, required: true, enum: ['m', 'cm', 'in', 'ft', 'yd', 'c', 'f', 'k'] },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Metric', metricSchema);
