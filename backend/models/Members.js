const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema({
  student_email: String,
});

const Members = mongoose.model('Members', membersSchema);

module.exports = Members;
