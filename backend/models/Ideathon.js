const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  yearAndSection: { type: String, required: true },
});

const ideathonSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  members: [{ type: studentSchema, required: true }],
  teamRepresentativeEmailAddress: { type: String, required: true, unique: true },
});

const Ideathon = mongoose.model('Ideathon', ideathonSchema);

module.exports = Ideathon;