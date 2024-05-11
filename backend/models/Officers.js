// officer.js
const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  section: { type: String, required: true },
  image: { type: String, required: true },
  bio: { type: String, required: true },
  githubLink: { type: String },
  fbLink: { type: String },
  email: { type: String, required: true },
}, { timestamps: true });

const Officer = mongoose.model('Officer', officerSchema);

module.exports = Officer;