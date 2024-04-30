const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  
    student_email: {

        type: String,
        required: true
    },

    dateRegistered: {

        type: String
    }
    

  // Add other fields as needed
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
