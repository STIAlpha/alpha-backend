// models/Participant.js
const mongoose = require('mongoose');

// Define a schema for the participant count
const participantCountSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        unique: true
    },
    count: {
        type: Number,
        required: true
    }
});

// Create a model for participant counts
const ParticipantCount = mongoose.model('ParticipantCount', participantCountSchema);

module.exports = ParticipantCount;
