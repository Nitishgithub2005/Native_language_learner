const mongoose = require('mongoose');
const connect = mongoose.connect("url");

// Check database connection
connect.then(() => {
    console.log("Database Connected Successfully");
}).catch((err) => {
    console.log("Database cannot be Connected", err);
});

// Create Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferredLanguage: { type: String, default: 'English' },
    languagesKnown: { type: String },
    currentStreak: { type: Number, default: 0 },
    highestStreak: { type: Number, default: 0 }
});

// collection part
const collection = mongoose.model("users", userSchema);

module.exports = collection;