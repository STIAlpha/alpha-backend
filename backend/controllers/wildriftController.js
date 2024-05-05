const asyncHandler = require('express-async-handler');
const Members = require('../models/Members');
const Wildrift = require('../models/Wildrift');

class WildriftController {
  // CREATE
  static registerToWildriftEvent = asyncHandler(async (req, res) => {
    const { teamName, participants, studentEmail } = req.body;

    if (!teamName ||!Array.isArray(participants) ||!participants.length ||!studentEmail) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validStudentEmail = await Members.findOne({ student_email: studentEmail.toLowerCase() }).lean().exec();

    if (!validStudentEmail) {
      return res.status(400).json({ message: 'Not a valid student email' });
    }

    const duplicate = await Wildrift.findOne({ 'members.email': studentEmail.toLowerCase() }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: 'Team already registered.' });
    }

    const validatedParticipants = participants.map((participant) => {
      // Perform validation on each participant object if needed
      // (e.g., ensure required fields are present)
      return participant;
    });

    if (validatedParticipants.length!== 5) {
      return res.status(400).json({ message: 'A team must have exactly 5 members' });
    }

    const wildriftEntryObject = {
      teamName,
      members: validatedParticipants
    };

    try {
      const wildriftEntry = await Wildrift.create(wildriftEntryObject);
      res.status(201).json({ message: 'Team has been successfully registered!' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid data received' });
    }
  });

  static getSingleWildriftTeam = asyncHandler(async (req, res) => {
    const teamName = req.params.teamName;

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