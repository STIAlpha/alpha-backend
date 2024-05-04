const mongoose = require('mongoose');

const beyondthelensSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true }, 
  studentEmail: { type: String, required: true },
  members: [{
    name: { type: String, required: true }, 
    yearAndSection: { type: String }
  }]
});


const Beyond = mongoose.model('Beyond', beyondthelensSchema);

module.exports = Beyond;