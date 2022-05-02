//Author : Sai Rahul Kodumuru (B00875628)
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
    },
    instrumentName: {
      type: String,
      required: true,
      trim: true,
    },
    instrumentSymbol: {
      type: String,
      required: true,
      trim: true,
    },
    instrumentType: {
      type: String,
      required: true,
      enum: ['Equity', 'Crypto'],
      default: 'Equity',
      trim: true,
    },
    instrumentRegion: {
      type: String,
    },
    currency: {
      type: String,
      required: true,
      default: 'USD',
    },
    buyQuantity: {
      type: Number,
      required: true,
    },
    avgBuyPrice: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
      default: 'NA',
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
