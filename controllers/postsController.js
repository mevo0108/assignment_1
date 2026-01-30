const postsModel = require("../models/postsModel");

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await postsModel.find();

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }

        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving posts" });
    }
};

// Get a single post by ID
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await postsModel.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving post" });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
};