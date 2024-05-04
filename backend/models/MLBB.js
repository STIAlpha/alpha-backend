const mongoose = require('mongoose');

// Define the event schema
const mLBBSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    studentEmail: { 
        type: String, 
        required: true 
    },
    mobileNumber:{
        type: String,
        required: true
    },
    teamMembers: [{

      nameOfMembers: { 
        type: String, 
        required: true 
    },
      inGameName: { 
        type: String,
        required: true 
    },
      currentMLBBRank: { 
        type: String,
        required: true  
    },
      courseAndSection: { 
        type: String ,
        required: true 
    }

    }] 

});

// Create the event model
const MobileLegends = mongoose.model('MobileLegends', mLBBSchema);

module.exports = MobileLegends;