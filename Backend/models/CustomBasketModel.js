// Author : Shiv Gaurang Desai
const mongoose = require("mongoose");

// Schema for Custom Basket that will be stored in custom_basket collection
const customBasketSchema = new mongoose.Schema(
  {
    basket_name: String,
    description: String,
    age_group: String,
    confidence_level: String,
    market_symbol: Array,
    _id: mongoose.Schema.Types.ObjectId,
    visibility: Boolean,
  },
  { collection: "custom_basket" }
);

const CustomBasketModel = mongoose.model("CustomBasket", customBasketSchema);

module.exports = CustomBasketModel;
