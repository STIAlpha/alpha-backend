const asyncHandler = require('express-async-handler')
const fs = require('fs')
const path = require('path')
const Attendance = require('../models/Attendance');
const Members = require('../models/Members');

class AttendanceController {
    // CREATE
    static addToAttendance = asyncHandler(async (req, res) => {

        const student_email = req.body.student_email;
        const dateObj = new Date();
        const month   = dateObj.getUTCMonth() + 1;
        const day     = dateObj.getUTCDate();
        const year    = dateObj.getUTCFullYear();

        const pMonth        = month.toString().padStart(2,"0");
        const pDay          = day.toString().padStart(2,"0");
        const newPaddedDate = `${year}/${pMonth}/${pDay}`;


        if(!student_email) {

            return res.status(400).json({message: 'Student Email required.'})
        }
        const student_email_with_domain = `${student_email}@ortigas-cainta.sti.edu.ph`;


        const duplicate = await Attendance.findOne({student_email:student_email_with_domain, dateRegistered: newPaddedDate }).lean().exec()

        if(duplicate) {
            
                return res.status(400).json({ message: 'Already registered for today.' });
            
        }
        

        const attendance = new Attendance({

           student_email: student_email_with_domain,
           dateRegistered:newPaddedDate
        });
        await attendance.save();

        if(attendance) {
            return res.status(200).json({message: 'Successfully registered.'});
        }
        else {
            return res.status(400).json({message: 'Invalid student email data received'});
        }


    })

    static CheckAttendance = asyncHandler(async (req, res) => {
        const student_email = req.body.student_email;
        const dateObj = new Date();
        const month   = dateObj.getUTCMonth() + 1;
        const day     = dateObj.getUTCDate();
        const year    = dateObj.getUTCFullYear();

        const pMonth        = month.toString().padStart(2,"0");
        const pDay          = day.toString().padStart(2,"0");
        const newPaddedDate = `${year}/${pMonth}/${pDay}`;

        const student_email_with_domain = `${student_email}@ortigas-cainta.sti.edu.ph`;

        if (!student_email) {
            return res.status(400).json({ message: 'Student Email required.' });
        }
    
        const validStudentEmail = await Members.findOne({ student_email:student_email_with_domain }).lean().exec();
    
        if (!validStudentEmail) {
            return res.status(400).json({ message: 'Not a valid student email' });
        }
    
    
        const existingAttendance = await Attendance.findOne({
            student_email:student_email_with_domain,
            dateRegistered:newPaddedDate
        }).lean().exec();
    
        if (existingAttendance) {
            return res.status(409).json({ message: 'Student Attended today' });
        }
        else
        {
            return res.status(409).json({ message: 'No attendance today' });
        }
    
        
    });

    static getAllAttendance = asyncHandler(async(req,res)=>{
        const atterdies= await Attendance.find().select('-student_email').lean()
        if(!atterdies?.length){
            return res.status(400).json({message:'No atterdies found'})
        }
        res.json(atterdies)
    })
}
    
    
module.exports = AttendanceController;
