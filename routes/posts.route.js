const express = require("express");
const {
    createPost,
    getAllPosts,
    getPostById,
} = require("../controllers/postsController");

const router = express.Router();

// Create a new post
router.post("/", createPost);

// Get all posts
router.get("/", getAllPosts);

// Get post by id
router.get("/:id", getPostById);

module.exports = router;