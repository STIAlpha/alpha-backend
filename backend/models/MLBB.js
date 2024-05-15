const mongoose = require('mongoose');

const Student = new mongoose.Schema({
  name: { type: String, required: true },
  coursesAndSections: { type: String, required: true },
  ign: { type: String, required: true },
  playerId: { type: String, required: true },
  currentMLBBRanks: { type: String, required: true }
});

const mLBBSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true
  },
  members: {
    type: [Student],
    required: true
  },
  representativemobileNumber: {
    type: String,
    required: true
  },
  repsresentativeemail: {
    type: String,
    required: true
}});

const MobileLegends = mongoose.model('MobileLegends', mLBBSchema);

module.exports = MobileLegends;