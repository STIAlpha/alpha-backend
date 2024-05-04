const mongoose = require('mongoose');

// Define the Website Development Competition entry schema
const webDevSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    participantNames: { type: String, required: true },
    yearAndSection: { type: String, required: true },
    teamRepEmail: { type: String, required: true },
    githubProfiles: { type: String, required: true }
});

// Create the Website Development Competition entry model
const WebDevEntry = mongoose.model('WebDevEntry', webDevSchema);

module.exports = WebDevEntry;
