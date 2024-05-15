const mongoose = require('mongoose');

const Student= new mongoose.Schema({
    name: { type: String, required: true },
    coursesAndSections: { type: String, required: true },
    githubProfiles: { type: String, required: true },
    
});
// Define the Website Development Competition entry schema
const webDevSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    members: { type: [Student], required: true },
    teamRepEmail: { type: String, required: true },
});

// Create the Website Development Competition entry model
const WebDevEntry = mongoose.model('WebDevEntry', webDevSchema);

module.exports = WebDevEntry;
