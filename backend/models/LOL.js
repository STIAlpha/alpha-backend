const mongoose = require('mongoose');

// Define the event schema
const lolSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    studentEmail: { 
        type: String, 
        required: true 
    },
    teamMembers: [{

      lastName: { 
        type: String, 
        required: true 
    },
      firstName: { 
        type: String, 
        required: true 
    },
      middleInitial: { 
        type: String,
        required: true  
    },
      discordUser:{
        type: String,
        required: true
    },
      ignAndTagline: { 
        type: String,
        required: true 
    },
      programAndSection: { 
        type: String ,
        required: true 
    },

    }] 

});

// Create the event model
const LeagueOfLegends = mongoose.model('LeagueOfLegends', lolSchema);

module.exports = LeagueOfLegends;