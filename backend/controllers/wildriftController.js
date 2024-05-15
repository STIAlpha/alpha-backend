const asyncHandler = require('express-async-handler');
const Members = require('../models/Members');
const Wildrift = require('../models/Wildrift');

class WildriftController {
  // CREATE
  static registerToWildriftEvent = asyncHandler(async (req, res) => {
    const { teamName, membersNames,membersCourses,membersEmails,membersIGN,membersRanks } = req.body;

    if (!teamName ||!membersNames||!membersCourses||!membersEmails||!membersIGN||!membersRanks ) {
      return res.status(400).json({ message: 'All fields required' });
    }
      
    //splice or trim comma based data into an array data
    const membersNamesArray = membersNames.split(',').map(name => name.trim());
    const membersCoursesArray = membersCourses.split(',').map(course => course.trim());
    const membersEmailsArray = membersEmails.split(',').map(emails => emails.trim());
    const membersIGNArray = membersIGN.split(',').map(ign => ign.trim());
    const membersRankssArray = membersRanks.split(',').map(ranks => ranks.trim());
  
    if (membersNamesArray.length !== membersCoursesArray.length) {
      return res.status(400).json({ message: 'Members names and courses must have the same number of entries.' });
    }
    if (membersNamesArray.length !== membersEmailsArray.length) {
      return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
    }
    if (membersNamesArray.length !== membersIGNArray.length) {
      return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
    }
    if (membersNamesArray.length !== membersRankssArray.length) {
      return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
    }
  
    //map each string to respective data
    const members = membersNamesArray.map((name, index) => ({
      name,
      coursesAndSections: membersCoursesArray[index],
      email: membersEmailsArray[index],
      ign:membersIGNArray[index],
      currentRank:membersRankssArray[index]
    }));
  

    const memberEmails = new Set();
    for (const member of members) {
        if (memberEmails.has(member.email)) {
            return res.status(400).json({ message: 'Duplicate emails found in team members.' });
        }
        memberEmails.add(member.email);
    }

    for (const member of members) {
        const student = await Members.findOne({ student_email: member.email }).lean().exec();
        if (!student) {
            return res.status(400).json({ message: `Student with email ${member.email} not found.` });
        }
    }

    const duplicate = await Wildrift.findOne({ teamName }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: 'Team already registered.' });
    }




    const wildriftEntryObject = {
      teamName,
      members
    };

    try {
      const wildriftEntry = await Wildrift.create(wildriftEntryObject);
      res.status(201).json({ message: 'Team has been successfully registered!' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid data received' });
    }
  });

  static getSingleWildriftTeam = asyncHandler(async (req, res) => {
    const {teamName} = req.body;

    if (!teamName) {
      return res.status(400).json({ message: 'Team name is required' });
    }

    try {
      const wildriftTeam = await Wildrift.findOne({ teamName }).lean().exec();
      if (!wildriftTeam) {
        return res.status(404).json({ message: 'Team not found' });
      }
      res.json(wildriftTeam);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  static getWildriftTeams = asyncHandler(async (req, res) => {
    try {
      const wildriftTeams = await Wildrift.find().lean().exec();
      if (!wildriftTeams.length) {
        return res.status(404).json({ message: 'No teams found' });
      }
      res.json(wildriftTeams);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

module.exports = WildriftController;