const mongoose = require('mongoose'); // <--- added

const tekkenSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  yearAndSection: { type: String, required: true, trim: true },
  stiEmailAddress: { type: String, required: true, trim: true, lowercase: true },
  discordUsername: { type: String, required: true, trim: true }
});

const Tekken = mongoose.model('Tekken', tekkenSchema);

module.exports = Tekken;