const Comment = require("../models/commentsModel");

// Create a new comment
const createComment = async (req, res) => {
    try {
        const { postId, sender, content } = req.body;

        if (!postId || !sender || !content) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const comment = new Comment({ postId, sender, content });
        await comment.save();

        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating comment" });
    }
};

// Get comment by ID
const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting comment" });
    }
};

// Update comment
const updateComment = async (req, res) => {
    try {
        const { content } = req.body;

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating comment" });
    }
};

// Delete comment
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.json({ message: "Comment deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting comment" });
    }
};

// Get comments by post ID
const getCommentsByPost = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting comments" });
    }
};

module.exports = {
    createComment,
    getCommentById,
    updateComment,
    deleteComment,
    getCommentsByPost,
};