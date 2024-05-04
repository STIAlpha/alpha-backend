const mongoose = require('mongoose');

// Define the Valorant event schema
const valorantSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    fullNamesOfPlayers: { type: String, required: true },
    programAndSection: { type: String, required: true },
    stiEmailAddresses: { type: String, required: true },
    discordUsernames: { type: String, required: true },
    valorantIGNsAndTaglines: { type: String, required: true },
    coachName: { type: String, default: '' }
});

// Create the event model
const Valorant = mongoose.model('Valorant', valorantSchema);

module.exports = Valorant;
