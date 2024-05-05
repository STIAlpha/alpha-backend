const asyncHandler = require('express-async-handler');
const ResearchForum = require('../models/ResearchForum');

class ResearchForumController {
  // CREATE
  static async registerToResearchForumEvent(req, res) {
    const {
      nameSchool,
      accompanyingAdviserName,
      studentParticipants,
      mobileNumberAdvisor,
      adviserEmail,
      titleResearch
    } = req.body;

    if (!nameSchool ||!accompanyingAdviserName ||!Array.isArray(studentParticipants) ||!studentParticipants.length ||!mobileNumberAdvisor ||!adviserEmail ||!titleResearch) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const duplicate = await ResearchForum.findOne({ adviserEmail }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const validatedStudentParticipants = studentParticipants.map((participant) => {
      // Perform validation on each participant object if needed
      // (e.g., ensure required fields are present)
      return participant;
    });

    if (validatedStudentParticipants.length < 1) {
      return res.status(400).json({ message: 'A team must have more than 1 members' });
    }

    const researchForumEntryObject = {
      titleResearch,
      adviserEmail,
      studentParticipants: validatedStudentParticipants // Include validated participants array
    };

    try {
      const researchForumEntry = await ResearchForum.create(researchForumEntryObject);
      return res.status(201).json({ message: 'Research Team has been successfully registered!' });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid data received' });
    }
  }

  static async getSingleResearchForumTeam(req, res) {
    const studentParticipants = req.params.studentParticipants;

    if (!studentParticipants) {
      return res.status(400).json({ message: 'Student participants are required' });
    }

    try {
      const researchForumTeam = await ResearchForum.findOne({ studentParticipants }).lean().exec();
      if (!researchForumTeam) {
        return res.status(404).json({ message: 'No team found' });
      }
      return res.json(researchForumTeam);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getResearchForumTeams(req, res) {
    try {
      const researchForumTeams = await ResearchForum.find().lean();
      if (!researchForumTeams.length) {
        return res.status(404).json({ message: 'No teams found' });
      }
      return res.json(researchForumTeams);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = ResearchForumController;