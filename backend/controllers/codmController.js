const asyncHandler = require('express-async-handler');
const Members = require('../models/Members');
const CODMEventEntry = require('../models/codm');

class CODMController {
  // CREATE
  static registerToCODMEvent = asyncHandler(async (req, res) => {
    const {teamName,membersName,membersCourses,membersIGN,membersplayerId,membersRanks,representativeEmail,representativeNumber} = req.body;

    
    if (
     !teamName ||
     !membersName||!membersCourses||!membersIGN||!membersplayerId||!membersRanks||!representativeEmail||!representativeNumber
    ) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const membersNamesArray = membersName.split(',').map(name => name.trim());
    const membersCoursesArray = membersCourses.split(',').map(course => course.trim());
    const membersIGNArray = membersIGN.split(',').map(ign => ign.trim());
    const membersID = membersplayerId.split(',').map(ign => ign.trim());
    const membersRankssArray = membersRanks.split(',').map(ranks => ranks.trim());
  
    if (membersNamesArray.length !== membersCoursesArray.length) {
      return res.status(400).json({ message: 'Members names and courses must have the same number of entries.' });
    }

    if (membersNamesArray.length !== membersIGNArray.length) {
      return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
    }
    if (membersNamesArray.length !== membersRankssArray.length) {
      return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
    }
    if (membersNamesArray.length !== membersID.length) {
      return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
    }
  
    //map each string to respective data
    const members = membersNamesArray.map((name, index) => ({
      name,
      coursesAndSections: membersCoursesArray[index],
      playerId: membersID[index],
      ign:membersIGNArray[index],
      currentRanks:membersRankssArray[index]
    }));


 
         const student = await Members.findOne({ student_email: representativeEmail }).lean().exec();
         if (!student) {
             return res.status(400).json({ message: `Student with email ${representativeEmail} not found.` });
         }
     
 

    const duplicate = await CODMEventEntry.findOne({ teamName  }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: 'Team Name already registered.' });
    }


    const codmEntryObject = {
      teamName,
      members,
      representativeEmail,
      representativeNumber
        };

    try {
      const codmEntry = await CODMEventEntry.create(codmEntryObject);
      res.status(201).json({ message: 'Team has been successfully registered!' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid data received' });
    }
  });

  // READ
  static getSingleCODMTeam = asyncHandler(async (req, res) => {
    const {teamName} = req.body;

    if (!teamName) {
      return res.status(400).json({ message: 'Team name is required' });
    }

    try {
      const codmTeam = await CODMEventEntry.findOne({ teamName }).lean().exec();
      if (!codmTeam) {
        return res.status(404).json({ message: 'Team not found' });
      }
      res.json(codmTeam);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  static getCODMTeams = asyncHandler(async (req, res) => {
    try {
      const codmTeams = await CODMEventEntry.find().lean().exec();
      if (!codmTeams.length) {
        return res.status(404).json({ message: 'No teams found' });
      }
      res.json(codmTeams);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

module.exports = CODMController;