const mongoose = require('mongoose');

const Student = new mongoose.Schema({
  name: { type: String, required: true },
  coursesAndSections: { type: String, required: true },
  ign: { type: String, required: true },
  email: { type: String, required: true },
  currentRank: { type: String, required: true }
});

const wildriftSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  members: { type: [Student], required: true }
});

const Wildrift = mongoose.model('Wildrift', wildriftSchema);

module.exports = Wildrift;