const mongoose = require('mongoose');

// Define the event schema
const chessSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    courseAndSection: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String, // Store as JSON or text
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    chessRating: {
        type: String,
    },
});

// Create the event model
const Chess = mongoose.model('Chess', chessSchema);

module.exports = Chess;
