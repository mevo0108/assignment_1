require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

// connect to database
connectDB();

// use express.json() to parse the request body
app.use(express.json());

// דוגמה ל־health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// use the posts router
const postsRouter = require('./routes/postsRoute');
app.use('/posts', postsRouter);

// listen to the port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

