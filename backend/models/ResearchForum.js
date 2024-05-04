const mongoose = require('mongoose')

// Define the event schema
const researchForumSchema = new mongoose.Schema({
    nameSchool: {
        type: String,
        required: true
    },
    accompanyingAdviserName: {
        type: String,
        required: true
    },
    studentParticipants: [{
        lastName: { type: String, required: true },
        firstName: { type: String, required: true },
        middleInitial: { type: String },
      }],

    mobileNumberAdvisor: {
        type: String,
        required: true
    },
    adviserEmail: {
        type: String, 
        required: true
    },
    titleResearch: {
        type: String, 
        required: true
    },
});

// Create the event model
const ResearchForum = mongoose.model('ResearchForum', researchForumSchema)

module.exports = ResearchForum;
