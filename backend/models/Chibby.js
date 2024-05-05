const mongoose = require('mongoose');

const chibbySchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true },
  yearAndSection: { type: String, required: true, trim: true },
  mobileNumber: { type: String, required: true, trim: true },
  studentEmail: { type: String, required: true, trim: true, unique: true, lowercase: true }
});

const Chibby = mongoose.model('Chibby', chibbySchema);

module.exports = Chibby;