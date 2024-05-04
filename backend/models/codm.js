const mongoose = require('mongoose');


const Student= new mongoose.Schema({
    Name: { type: String, required: true },
    coursesAndSections: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    ign: { type: String, required: true },
    playerId: { type: String, required: true },
    currentRanks: { type: String, required: true }
});

// Define the CODM event entry schema
const codmSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    members: { type: [Student], required: true },

});

// Create the CODM event entry model
const CODMEventEntry = mongoose.model('CODMEventEntry', codmSchema);

module.exports = CODMEventEntry;
