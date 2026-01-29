const postsModel = require('../models/postsModel');

// get all posts OR by author
const getAllPosts = async (req, res) => {
    try {
        const author = req.query.author; // to filter by author if provided
        if (author) {
            const postsByAuthor = await postsModel.find({ author: author });
            if (postsByAuthor.length === 0) {
                return res.status(404).json("No posts found by this author");
            }
            res.json(postsByAuthor);
        }
        const posts = await postsModel.find();
        if (posts.length === 0) {
            return res.status(404).json("No posts found");
        }
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json("error retrieving posts");
    }
};

// create a new post
const createPost = async (req, res) => {
    try {
        // check if all fields are provided
        const { title, author, content } = req.body;
        if (!title || !author || !content) {
            return res.status(400).json("Title, author, and content are required");
        }

        // create the post
        const post = await postsModel.create({ title, author, content });
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json("Error creating post");
    }
};

module.exports = {
    getAllPosts,
    createPost
};