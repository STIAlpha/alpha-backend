const asyncHandler = require('express-async-handler');
const Members = require('../models/Members');
const MobileLegends = require('../models/MLBB');

class MLBBController {
  // CREATE
  static registerToMLBBEvent = asyncHandler(async (req, res) => {
    const { teamName, members } = req.body;

    if (!teamName ||!members) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const memberEmails = new Set();
     for (const member of members) {
         if (memberEmails.has(member.email)) {
             return res.status(400).json({ message: 'Duplicate emails found in team members.' });
         }
         memberEmails.add(member.email);
     }
 
     // Check if each member exists in the database
     for (const member of members) {
         const student = await Members.findOne({ student_email: member.email }).lean().exec();
         if (!student) {
             return res.status(400).json({ message: `Student with email ${member.email} not found.` });
         }
     }
 
    const duplicate = await MobileLegends.findOne({ teamName }).lean().exec();

    if (duplicate) {
      return res.status(400).json({ message: 'Team already registered.' });
    }

    const mLBBEntryObject = {
      teamName,
      members
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