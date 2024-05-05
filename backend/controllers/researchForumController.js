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


    const researchForumEntryObject = {
      nameSchool,
      accompanyingAdviserName,
      studentParticipants,
      mobileNumberAdvisor,
      adviserEmail,
      titleResearch
    };

    try {
      const researchForumEntry = await ResearchForum.create(researchForumEntryObject);
      return res.status(201).json({ message: 'Research Team has been successfully registered!' });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid data received' });
    }
  }

  static async getSingleResearchForumTeam(req, res) {
    const {nameSchool} = req.body;

    if (!nameSchool) {
      return res.status(400).json({ message: 'Student participants are required' });
    }

    try {
      const researchForumTeam = await ResearchForum.findOne({ nameSchool }).lean().exec();
      if (!researchForumTeam) {
        return res.status(404).json({ message: 'No School found' });
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
        return res.status(404).json({ message: 'No Particioants found' });
      }
      return res.json(researchForumTeams);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = ResearchForumController;