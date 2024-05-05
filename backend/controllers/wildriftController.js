const asyncHandler = require('express-async-handler');
const Members = require('../models/Members');
const Wildrift = require('../models/Wildrift');

class WildriftController {
  // CREATE
  static registerToWildriftEvent = asyncHandler(async (req, res) => {
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