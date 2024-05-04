const mongoose = require('mongoose');

const Student= new mongoose.Schema({
  Name: { type: String, required: true },
  coursesAndSections: { type: String, required: true },
  ign: { type: String, required: true },
  email: { type: String, required: true },
  currentrank:{type:String,required:true}
});
// Define the event schema
const wildriftSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    members: { type: [Student], required: true },
    
  });

// Create the event model
const Wildrift = mongoose.model('Wildrift', wildriftSchema);

module.exports = Wildrift;
