const mongoose = require('mongoose');

const Student= new mongoose.Schema({
  Name: { type: String, required: true },
  coursesAndSections: { type: String, required: true },
  discordName: { type: String, required: true },
  email: { type: String, required: true },
  ign: { type: String, required: true },
  currentRanks: { type: String, required: true }
});

// Define the event schema
const lolSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    
    members: {type:Student,required:true} 

});

// Create the event model
const LeagueOfLegends = mongoose.model('LeagueOfLegends', lolSchema);

module.exports = LeagueOfLegends;