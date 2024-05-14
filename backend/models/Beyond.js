const mongoose = require('mongoose');

const Student = new mongoose.Schema({
  name: { type: String, required: true },
  coursesAndSections: { type: String, required: true },
  email: { type: String, required: true },

});
const beyondthelensSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true }, 
  members: {type:[Student],required: true},
  representativeEmail:{ type: String, required: true },

});


const Beyond = mongoose.model('Beyond', beyondthelensSchema);

module.exports = Beyond;