const commentsModel = require('../models/commentsModel');

// get all comments
const getAllComments = async (req, res) => {
    try {
        const postId = req.query.postId; // filter option by post
        let comments;
        if (postId) {
            comments = await commentsModel.find({ postId: postId });
        } else {
            comments = await commentsModel.find();
        }

        if (!comments || comments.length === 0) {
            return res.status(404).json("No comments found");
        }
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json("Error retrieving comments");
    }
};


// create a new comment
const createComment = async (req, res) => {
    try {
        // check if all fields are provided
        const { postId, author, content } = req.body;
        if (!postId || !author || !content) {
            return res
                .status(400)
                .json("postId, author, and content are required");
        }

        // create the comment
        const comment = await commentsModel.create({ postId, author, content });
        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json("Error creating comment");
    }
};

module.exports = {
    getAllComments,
    createComment,
};