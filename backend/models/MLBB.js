const mongoose = require('mongoose');

const Student= new mongoose.Schema({
  Name: { type: String, required: true },
  coursesAndSections: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  ign: { type: String, required: true },
  playerId: { type: String, required: true },
  currentMLBBRanks: { type: String, required: true }
});

// Define the event schema
const mLBBSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    
    members: {
      type:[Student], rewuired:true
    }

});

// Create the event model
const MobileLegends = mongoose.model('MobileLegends', mLBBSchema);

module.exports = MobileLegends;