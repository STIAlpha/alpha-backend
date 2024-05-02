const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema({
  student_email: String,
  name: String,
  program:String,
  interest:String,
  number:String
});

const Members = mongoose.model('Members', membersSchema);

module.exports = Members;
