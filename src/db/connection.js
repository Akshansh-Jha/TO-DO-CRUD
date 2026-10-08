const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/firstdatabase';

//connects to MongoDB; returns a promise so the server can wait for it before listening
const connectDB = async () => {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
};

module.exports = connectDB;
