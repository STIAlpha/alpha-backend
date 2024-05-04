const mongoose = require('mongoose');

// Define the CODM event entry schema
const codmSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    memberNames: { type: String, required: true },
    coursesAndSections: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    igns: { type: String, required: true },
    playerIds: { type: String, required: true },
    currentRanks: { type: String, required: true }
});

// Create the CODM event entry model
const CODMEventEntry = mongoose.model('CODMEventEntry', codmSchema);

module.exports = CODMEventEntry;
