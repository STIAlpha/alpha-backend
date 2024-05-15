const mongoose = require('mongoose');
const Student= new mongoose.Schema({
    name: { type: String, required: true },
    coursesAndSections: { type: String, required: true },
    email: { type: String, required: true },
    discordusername: { type: String, required: true },
    ign: { type: String, required: true },
});
// Define the Valorant event schema
const valorantSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    members: {type:[Student],required:true},
    coachname: { type: String }

});

// Create the event model
const Valorant = mongoose.model('Valorant', valorantSchema);

module.exports = Valorant;
