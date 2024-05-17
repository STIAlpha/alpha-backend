const asyncHandler = require('express-async-handler')
const CSQuizbee = require('../models/QuizBeeCS');

class CSquizbeeController {
    // CREATE
    static registerToCSquizbeeEvent = asyncHandler(async (req, res) => {
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

    

    const duplicate = await CSQuizbee.findOne({ teamName }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: 'Team already registered.' });
    }

      
          const QBCS = {
            teamName,
            representativeEmail,
            members,
          };
      
          try {
            const QBCSentry = await CSQuizbee.create(QBCS);
            res.status(201).json({
              message: "Team has been successfully registered!",
              data: QBCSentry,
            });
          } catch (error) {
            res.status(400).json({ message: "Invalid data received" });
          }
        });


    static getCSquizbeeEntries = asyncHandler(async (req, res) => {
        const { Name } = req.body

        const CSquizbeeEntries = await CSQuizbee.findOne(Name).lean()

        // If no users 
        if (!CSquizbeeEntries) {
            return res.status(400).json({ message: 'No Entries Found' })
        }

        res.json(CSquizbeeEntries);

    });

    static getCSquizbeeEntryByName = asyncHandler(async (req, res) => {

        const {Name} = req.body;

        if (!Name) {
            return res.status(400).json({ message: 'Enter a student name.' });
        }

        const student = await CSQuizbee.findOne({ Name }).lean().exec()

        if (!student) {
            return res.status(400).json({ message: 'No entry found' })
        }
        res.json(student)
    })
}
module.exports = CSquizbeeController;