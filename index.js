require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Posts routes
const postsRouter = require("./routes/posts.route");
app.use("/post", postsRouter);

<<<<<<< HEAD
// use the Comments router
const commentsRouter = require('./routes/commentsRoute');
app.use('/comments', commentsRouter);


// listen to the port
=======
// Comments routes
const commentRoutes = require("./routes/comment.route");
app.use("/comment", commentRoutes)

// Start the server
>>>>>>> e9a72c2b34f8d523d2c56e048bef274d5de57516
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});