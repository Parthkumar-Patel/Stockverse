//Author : Parthkumar Patel (B00899800)
const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema(
    {
        UserId: { type: String},
        Name: { type: String},
        Investments: { type: String },
    },
    {timestamps: true}
)

module.exports = mongoose.model("wishlists",WishlistSchema);