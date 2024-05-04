const mongoose = require('mongoose'); 

const tekkenSchema = new mongoose.Schema({
  fullName: { type: String, required: true},
  yearAndSection: { type: String, required: true},
  stiEmailAddress: { type: String, required: true},
  discordUsername: { type: String, required: true}
});

const Tekken = mongoose.model('Tekken', tekkenSchema);

module.exports = Tekken;