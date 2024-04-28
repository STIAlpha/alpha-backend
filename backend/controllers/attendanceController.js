const asyncHandler = require('express-async-handler')
const fs = require('fs')
const path = require('path')
const Attendance = require('../models/Attendance');
const Members = require('../models/Members');

class AttendanceController {
    // CREATE
    static addToAttendance = asyncHandler(async (req, res) => {

        const student_email = req.body.student_email;

        if(!student_email) {

            return res.status(400).json({message: 'Student Email required.'})
        }

        const validStudentEmail = await Members.findOne({student_email}).lean().exec()

        if(!validStudentEmail) {
            
            return res.status(400).json({message: 'Not a valid student email'})
        }

        const duplicate = await Attendance.findOne({student_email}).lean().exec()

        if(duplicate) {
            return res.status(409).json({message: 'Student Email already registered'})
        }

        const attendance = new Attendance({

           student_email

        });
        await attendance.save();

        if(attendance) {
            return res.status(200).json({message: 'Successfully registered.'});
        }
        else {
            return res.status(400).json({message: 'Invalid student email data received'});
        }


    })
}
    
    
module.exports = AttendanceController;
