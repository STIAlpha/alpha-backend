const mongoose = require('mongoose');


// Define the Tekken event schema
const tekkenSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    yearAndSection: { type: String, required: true },
    stiEmailAddress: { type: String, required: true },
    discordUsername: { type: String, required: true }
});

// Create the event model
const Tekken = mongoose.model('Tekken', tekkenSchema);

module.exports = Tekken;
