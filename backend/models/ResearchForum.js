const mongoose = require('mongoose');

// Define the event schema
const researchForumSchema = new mongoose.Schema({
  nameSchool: {
    type: String,
    required: true,
    trim: true
  },
  accompanyingAdviserName: {
    type: String,
    required: true,
    trim: true
  },
  studentParticipants: [{
    name: {
      type: String,
      required: true,
      trim: true
    }
  }],
  mobileNumberAdvisor: {
    type: String,
    required: true,
    trim: true
  },
  adviserEmail: {
    type: String,
    required: true,
    trim: true,
    unique: true 
  },
  titleResearch: {
    type: String,
    required: true,
    trim: true
  }
});

// Create the event model
const ResearchForum = mongoose.model('ResearchForum', researchForumSchema);

module.exports = ResearchForum;