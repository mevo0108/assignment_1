// config/db.js
const mongoose = require('mongoose');

async function connectDB() {
    try {
        const mongoUri = process.env.DATABASE_URL;

        if (!mongoUri) {
            throw new Error('DATABASE_URL is not defined in .env');
        }

        await mongoose.connect(mongoUri, {
            // פה אפשר להוסיף אופציות אם צריך
        });

        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // עוצר את השרת אם אין חיבור
    }
}

module.exports = connectDB;