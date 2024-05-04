const mongoose = require('mongoose')

const Student= new mongoose.Schema({
  Name: { type: String, required: true },
  coursesAndSections: { type: String, required: true },
});

// Define the event schema
const ideathonSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    members: {type:[Student],required:true},
    teamRepresentativeEmailAddress: {
        type: String, 
        required: true
    },
});

// Create the event model
const Ideathon = mongoose.model('Ideathon', ideathonSchema)

module.exports = Ideathon;
