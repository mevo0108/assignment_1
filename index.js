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
const postsRouter = require("./routes/postsRoute");
app.use("/post", postsRouter);

// use the Comments router
const commentsRouter = require('./routes/commentsRoute');
app.use('/comments', commentsRouter);


// listen to the port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});