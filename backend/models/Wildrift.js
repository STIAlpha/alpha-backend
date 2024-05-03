const mongoose = require('mongoose');

// Define the event schema
const wildriftSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    participants: [{
      lastName: { type: String, required: true },
      firstName: { type: String, required: true },
      middleInitial: { type: String },
      ingameName: { type: String },
      currentRank: { type: String },
      yearAndSection: { type: String }
    }] // Array of participant objects
  });

// Create the event model
const Wildrift = mongoose.model('Wildrift', wildriftSchema);

module.exports = Wildrift;
