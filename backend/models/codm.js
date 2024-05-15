const mongoose = require('mongoose');

const Student = new mongoose.Schema({
  name: { type: String, required: true },
  coursesAndSections: { type: String, required: true },
  ign: { type: String, required: true },
  playerId: { type: String, required: true },
  currentRanks: { type: String, required: true }
});

const codmSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  members: { type: [Student], required: true },
  representativeEmail: { type: String, required: true },
  representativeNumber: { type: String, required: true },

});

const CODMEventEntry = mongoose.model('CODMEventEntry', codmSchema);

module.exports = CODMEventEntry;