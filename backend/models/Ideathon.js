const mongoose = require('mongoose')


// Define the event schema
const ideathonSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    memberName: [{
        lastName: { type: String, required: true },
        firstName: { type: String, required: true },
        middleInitial: { type: String },
      }],
    memberYearSection: [{
        surName: { type: String, required: true },
        year: { type: String, required: true },
        section: { type: String },
      }],
    teamRepresentativeEmailAddress: {
        type: String, 
        required: true
    },
});

// Create the event model
const Ideathon = mongoose.model('Ideathon', ideathonSchema)

module.exports = Ideathon;
