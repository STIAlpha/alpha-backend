const asyncHandler = require('express-async-handler');
const Members = require('../models/Members');
const CODMEventEntry = require('../models/codm');

class CODMController {
  // CREATE
  static registerToCODMEvent = asyncHandler(async (req, res) => {
    const {
      teamName,
      memberNames,
      coursesAndSections,
      email,
      mobileNumber,
      igns,
      playerIds,
      currentRanks,
      agreement
    } = req.body;

    if (
     !teamName ||
     !memberNames ||
     !coursesAndSections ||
     !email ||
     !mobileNumber ||
     !igns ||
     !playerIds ||
     !currentRanks ||
      agreement === undefined
    ) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validEmail = await Members.findOne({ student_email: email.toLowerCase() }).lean().exec();

    if (!validEmail) {
      return res.status(400).json({ message: 'Not a valid email' });
    }

    const duplicate = await CODMEventEntry.findOne({ 'members.email': email.toLowerCase() }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: 'Team already registered.' });
    }

    const members = memberNames.map((member, index) => ({
      name: member,
      coursesAndSections,
      email,
      mobileNumber,
      ign: igns[index],
      playerId: playerIds[index],
      currentRanks: currentRanks[index]
    }));

    const codmEntryObject = {
      teamName,
      members,
      agreement
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
    const teamName = req.params.teamName;

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