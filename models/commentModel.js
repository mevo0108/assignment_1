const mongoose = require("mongoose");

// Comment schema
const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post",
    },
    sender: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

// Comment model
module.exports = mongoose.model("Comment", commentSchema);