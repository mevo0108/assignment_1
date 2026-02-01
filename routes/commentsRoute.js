const express = require("express");
const {
    createComment,
    getCommentById,
    updateComment,
    deleteComment,
} = require("../controllers/commentsController");

const router = express.Router();

// Create comment
router.post("/", createComment);

// Get comment by id
router.get("/:id", getCommentById);

// Update comment
router.put("/:id", updateComment);

// Delete comment
router.delete("/:id", deleteComment);

module.exports = router;