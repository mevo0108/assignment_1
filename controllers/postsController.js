const postsModel = require("../models/postsModel");

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, sender, content } = req.body;

        // Basic validation
        if (!title || !sender || !content) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newPost = new postsModel({
            title,
            sender,
            content,
        });

        await newPost.save();

        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating post" });
    }
};

// Get all posts (optionally filter by sender: GET /post?sender=<sender_id>)
const getAllPosts = async (req, res) => {
    try {
        const { sender: senderId } = req.query;
        const filter = senderId ? { sender: senderId } : {};
        const posts = await postsModel.find(filter);

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

// Update Post by ID
// Update post by id (FULL REPLACE using PUT)
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, sender, content } = req.body;

        // Validation: PUT requires all fields to be present
        if (!title || !sender || !content) {
            return res.status(400).json({ message: "All fields are required for PUT" });
        }

        const updatedPost = await postsModel.findByIdAndUpdate(
            id,
            { title, sender, content },
            {
                new: true,      // Return the updated document
                overwrite: true // Completely replace the document (PUT behavior)
            }
        );

        // If post was not found
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating post" });
    }
};


module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
};