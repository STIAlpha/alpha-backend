const asyncHandler = require('express-async-handler')
const qb = require('../models/QuizBeeIT');

class ITquizbeeController {
    // CREATE
    static registerToITquizbeeEvent = asyncHandler(async (req, res) => {
        const {
            teamName,
            representativeEmail,
            membersNames,membersCourses,
          } = req.body;
      
          if (
           !teamName ||
           !representativeEmail ||
           !membersNames ||!membersCourses
          ) {
            return res.status(400).json({ message: "All fields are required" });
          }
      
      
      
          const membersNamesArray = membersNames.split(',').map(name => name.trim());
          const membersCoursesArray = membersCourses.split(',').map(course => course.trim());
      
          if (membersNamesArray.length !== membersCoursesArray.length) {
            return res.status(400).json({ message: 'Members names and courses must have the same number of entries.' });
          }
      
          //map each string to respective data
          const members = membersNamesArray.map((name, index) => ({
            name,
            coursesAndSections: membersCoursesArray[index],
          }));
    

    const duplicate = await qb.findOne({ teamName }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: 'Team already registered.' });
    }

      
      
      
       

      
          const QBIT = {
            teamName,
            representativeEmail,
            members,
          };
      
          try {
            const QBITentry = await qb.create(QBIT);
            res.status(201).json({
              message: "Team has been successfully registered!",
              data: QBITentry,
            });
          } catch (error) {
            res.status(400).json({ message: "Invalid data received" });
          }
        });

  static getITquizbeeEntries = asyncHandler(async (req, res) => {

    const ITquizbeeEntries = await qb.find().lean()

    // If no users 
    if (!ITquizbeeEntries?.length) {
        return res.status(400).json({ message: 'No entries found' })
    }

    res.json(ITquizbeeEntries);

});

    static getITquizbeeEntryByName = asyncHandler(async (req, res) => {

        const {Name} = req.body;

        if(!Name) {
            return res.status(400).json({message: 'Enter a student name.'});
        }

        const student = await qb.findOne({Name}).lean().exec()

        if(!student) {
            return res.status(400).json({message: 'No entry found'})
        }
        res.json(student)
    })
}
    module.exports = ITquizbeeController;