const mongoose = require('mongoose');
const Student= new mongoose.Schema({
    Name: { type: String, required: true },
    coursesAndSections: { type: String, required: true },
    email: { type: String, required: true },
    discordusername: { type: Number, required: true },
    ign: { type: String, required: true },
    coachname: { type: String, required: true },
});
// Define the Valorant event schema
const valorantSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    members: {type:[Student],required:true}
});

// Create the event model
const Valorant = mongoose.model('Valorant', valorantSchema);

module.exports = Valorant;
