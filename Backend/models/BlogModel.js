//Author : Pallavi Cherukupalli (B00887062)
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        BlogContent: { type: String},
        TimePosted: { type: String },
    },
    { collection: 'blogs' }
)

module.exports = mongoose.model("blogs",BlogSchema);