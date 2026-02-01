const express = require("express");
const {
    createPost,
    getAllPosts,
    getPostById,
} = require("../controllers/postsController");

const { getCommentsByPost } = require("../controllers/commentsController");

const router = express.Router();

// Create a new post
router.post("/", createPost);

// Get all posts
router.get("/", getAllPosts);

// Get post by id
router.get("/:id", getPostById);


// Get comments By post ID
router.get("/:postId/comments", getCommentsByPost);

module.exports = router;