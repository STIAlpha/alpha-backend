// beyondController.js
const asyncHandler = require('express-async-handler');
const Members = require('../models/Members');
const Beyond = require('../models/Beyond');

class BeyondController {
  // CREATE
  static async registerToBeyondEvent(req, res) {
    const { teamName, members, studentEmail } = req.body;

    if (!teamName ||!Array.isArray(members) ||!members.length ||!studentEmail) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validStudentEmail = await Members.findOne({ studentEmail }).lean().exec();

    if (!validStudentEmail) {
      return res.status(400).json({ message: 'Not a valid student email' });
    }

    const duplicate = await Beyond.findOne({ studentEmail }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: 'Team already registered.' });
    }

    if (members.length!== 4) {
      return res.status(400).json({ message: 'A team must have exactly 4 members' });
    }

    const beyondEntryObject = {
      teamName,
      studentEmail,
      members,
    };

    try {
      const beyondEntry = await Beyond.create(beyondEntryObject);
      res.status(201).json({ message: 'Team has been successfully registered!' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid data received' });
    }
  }

  static async getSingleBeyondTeam(req, res) {
    const teamName = req.params.teamName;

    if (!teamName) {
      return res.status(400).json({ message: '.' });
    }

    try {
      const beyondTeam = await Beyond.findOne({ teamName }).lean().exec();
      if (!beyondTeam) {
        return res.status(404).json({ message: 'No team found' });
      }
      res.json(beyondTeam);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getBeyondTeams(req, res) {
    try {
      const beyondTeams = await Beyond.find().lean();
      if (!beyondTeams.length) {
        return res.status(404).json({ message: 'No teams found' });
      }
      res.json(beyondTeams);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = BeyondController;