// Author : Sai Rahul Kodumuru (B00875628)
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
  {
    stock_name: String,
    stock_symbol: String,
    stock_sector: String,
    pe_ratio: Number,
    stock_market: String,
  },
  { collection: 'stocks' } // Map to existing Collection Name or give a new name
);

// User Model
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
