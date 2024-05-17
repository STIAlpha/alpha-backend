const asyncHandler = require('express-async-handler');
const MobileLegends = require('../models/MLBB');

class MLBBController {
  // CREATE
  static registerToMLBBEvent = asyncHandler(async (req, res) => {
    const { teamName, membersNames,membersCourses,membersEmails,membersIGN,membersID,membersRank,representativemobileNumber,repsresentativeemail } = req.body;


    if (!teamName ||!membersNames||!membersCourses||!membersEmails||!membersIGN||!membersID||!membersRank||!representativemobileNumber||!repsresentativeemail) {
      return res.status(400).json({ message: 'All fields required' });
    }
    const membersNamesArray = membersNames.split(',').map(name => name.trim());
        const membersCoursesArray = membersCourses.split(',').map(course => course.trim());
        const membersEmailsArray = membersEmails.split(',').map(emails => emails.trim());
        const membersIGNArray = membersIGN.split(',').map(ign => ign.trim());
        const membersIDArray = membersID.split(',').map(ign => ign.trim());
        const membersRanksArray = membersRank.split(',').map(dc => dc.trim());
      
        if (membersNamesArray.length !== membersCoursesArray.length) {
          return res.status(400).json({ message: 'Members names and courses must have the same number of entries.' });
        }
        if (membersNamesArray.length !== membersEmailsArray.length) {
          return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
        }
        if (membersNamesArray.length !== membersIGNArray.length) {
          return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
        }
        if (membersNamesArray.length !== membersIDArray.length) {
          return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
        }
        if (membersNamesArray.length !== membersRanksArray.length) {
          return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
        }
      
        //map each string to respective data
        const members = membersNamesArray.map((name, index) => ({
          name,
          coursesAndSections: membersCoursesArray[index],
          email: membersEmailsArray[index],
          ign:membersIGNArray[index],
          playerId:membersIDArray[index],
          currentMLBBRanks:membersRanksArray[index]
        }));

    const memberEmails = new Set();
     for (const member of members) {
         if (memberEmails.has(member.email)) {
             return res.status(400).json({ message: 'Duplicate emails found in team members.' });
         }
         memberEmails.add(member.email);
     }

 
    const duplicate = await MobileLegends.findOne({ teamName }).lean().exec();

    if (duplicate) {
      return res.status(400).json({ message: 'Team already registered.' });
    }

    const mLBBEntryObject = {
      teamName,
      members,
      representativemobileNumber,repsresentativeemail
    };

    try {
      const mLBBEntry = await MobileLegends.create(mLBBEntryObject);
      res.status(201).json({ message: 'Team has been successfully registered!' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid data received' });
    }
  });

  static getSingleMLBBTeam = asyncHandler(async (req, res) => {
    const {teamName} = req.body;

    if (!teamName) {
      return res.status(400).json({ message: 'Team name is required' });
    }

    try {
      const mLBBTeam = await MobileLegends.findOne({ teamName }).lean().exec();
      if (!mLBBTeam) {
        return res.status(404).json({ message: 'No team found' });
      }
      res.json(mLBBTeam);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  static getMLBBTeams = asyncHandler(async (req, res) => {
    try {
      const mLBBTeams = await MobileLegends.find().lean();
      if (!mLBBTeams.length) {
        return res.status(404).json({ message: 'No teams found' });
      }
      res.json(mLBBTeams);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

module.exports = MLBBController;