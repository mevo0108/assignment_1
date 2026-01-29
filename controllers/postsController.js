const postsModel = require('../models/postsModel');

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

module.exports = {
    getAllPosts
};