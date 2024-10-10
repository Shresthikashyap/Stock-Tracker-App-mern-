const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: String,
  data: Array,
  predictions: Array,
});

module.exports = mongoose.model('Stock', stockSchema);
