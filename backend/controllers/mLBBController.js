const asyncHandler = require('express-async-handler');
const Members = require('../models/Members');
const MobileLegends = require('../models/MLBB');

class MLBBController {
  // CREATE
  static registerToMLBBEvent = asyncHandler(async (req, res) => {
    const { teamName, studentEmail, mobileNumber, teamMembers } = req.body;

    if (!teamName ||!studentEmail ||!mobileNumber ||!Array.isArray(teamMembers) || teamMembers.length!== 5) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validStudentEmail = await Members.findOne({ student_email: studentEmail.toLowerCase() }).lean().exec();

    if (!validStudentEmail) {
      return res.status(400).json({ message: 'Not a valid student email' });
    }

    const duplicate = await MobileLegends.findOne({ studentEmail: studentEmail.toLowerCase() }).lean().exec();

    if (duplicate) {
      return res.status(400).json({ message: 'Team already registered.' });
    }

    const mLBBEntryObject = {
      teamName,
      studentEmail: studentEmail.toLowerCase(),
      mobileNumber,
      teamMembers
    };

    try {
      const mLBBEntry = await MobileLegends.create(mLBBEntryObject);
      res.status(201).json({ message: 'Team has been successfully registered!' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid data received' });
    }
  });

  static getSingleMLBBTeam = asyncHandler(async (req, res) => {
    const teamName = req.params.teamName;

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