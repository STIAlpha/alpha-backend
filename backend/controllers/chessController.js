const asyncHandler = require('express-async-handler')

const Members = require('../models/Members');
const Chess = require('../models/Chess');

class ChessController {
    // CREATE
    static registerToChessEvent = asyncHandler(async (req, res) => {
    const { studentName, courseAndSection, student_email, chessRating, mobileNumber } = req.body;

    if (!studentName || !courseAndSection || !student_email || !mobileNumber) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validStudentEmail = await Members.findOne({student_email}).lean().exec()

    if(!validStudentEmail) {
        
        return res.status(400).json({message: 'Not a valid student email'})
    }

    const duplicate = await Chess.findOne({ studentName }).lean().exec();

    if(duplicate) {
        return res.status(409).json({message: 'Student already registered.'});
    }

    const chessEntryObject = { studentName, courseAndSection, student_email, chessRating, mobileNumber}

     // Create and store new chess entry
     const chessEntry = await Chess.create(chessEntryObject)

     if(chessEntry) {
        return res.status(200).json({message: 'Student has been successfully registered!'})
     }else {
        return res.status(400).json({message: 'Invalid data received'})
     }   
  });

  static getChessEntries = asyncHandler(async (req, res) => {

    const chessEntries = await Chess.find().lean()

    // If no users 
    if (!chessEntries?.length) {
        return res.status(400).json({ message: 'No entries found' })
    }

    res.json(chessEntries);

});


    static getChessEntryByName = asyncHandler(async (req, res) => {

        const {studentName} = req.body;

        if(!studentName) {
            return res.status(400).json({message: 'Enter a student name.'});
        }

        const student = await Chess.findOne({studentName}).lean().exec()

        if(!student) {
            return res.status(400).json({message: 'No entry found'})
        }
        res.json(student)


    })

}
    
    
    module.exports = ChessController;
