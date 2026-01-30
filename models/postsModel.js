const mongoose = require("mongoose");

// Post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

// Force collection name to avoid old schema cache
module.exports = mongoose.model("Post", postSchema, "posts");