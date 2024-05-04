const asyncHandler = require('express-async-handler')
const Members = require('../models/Members');
const CSQuizbee = require('../models/QuizBeeCS');

class CSquizbeeController {
    // CREATE
    static registerToCSquizbeeEvent = asyncHandler(async (req, res) => {
    const { Name, YearAndSection, STIstudentEmail} = req.body;

    if (!Name || !YearAndSection || !STIstudentEmail) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validStudentEmail = await Members.findOne({STIstudentEmail}).lean().exec()

    if(!validStudentEmail) {
        
        return res.status(400).json({message: 'Not a valid student email'})
    }

    const duplicate = await CSQuizbee.findOne({ Name }).lean().exec();

    if(duplicate) {
        return res.status(409).json({message: 'Student already registered.'});
    }

    const CSquizbeeEntryObject = { Name, YearAndSection, STIstudentEmail}

     // Create and store new chess entry
     const CSquizbeeEntry = await ITQuizbee.create(CSquizbeeEntryObject)

     if(CSquizbeeEntry) {
        return res.status(200).json({message: 'Student has been successfully registered!'})
     }else {
        return res.status(400).json({message: 'Invalid data received'})
     }   
  });

  static getCSquizbeeEntries = asyncHandler(async (req, res) => {

    const CSquizbeeEntries = await CSQuizbee.find().lean()

    // If no users 
    if (!CSquizbeeEntries?.length) {
        return res.status(400).json({ message: 'No entries found' })
    }

    res.json(CSquizbeeEntries);

});

    static getCSquizbeeEntryByName = asyncHandler(async (req, res) => {

        const studentName = req.params.Name;

        if(!studentName) {
            return res.status(400).json({message: 'Enter a student name.'});
        }

        const student = await CSQuizbee.findOne({Name}).lean().exec()

        if(!student) {
            return res.status(400).json({message: 'No entry found'})
        }
        res.json(student)
    })
}
    module.exports = CSquizbeeController;