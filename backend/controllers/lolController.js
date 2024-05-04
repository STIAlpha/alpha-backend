const { Student } = require('../models/LOL');
const { LeagueOfLegends: LeagueOfLegendsModel } = require('../models/LOL');

class LOLController {
  // CREATE
  static async registerTeam(req, res) {
    const { teamName, studentEmail, teamMembers } = req.body;

    if (!teamName ||!studentEmail ||!Array.isArray(teamMembers) || teamMembers.length!== 5) {
      return res.status(400).json({ message: 'Invalid request. Please provide team name, student email, and 5 team members.' });
    }

    const student = await Student.findOne({ email: studentEmail }).lean().exec();
    if (!student) {
      return res.status(400).json({ message: 'Not a valid student email.' });
    }

    const duplicate = await LeagueOfLegendsModel.findOne({ teamName }).lean().exec();
    if (duplicate) {
      return res.status(400).json({ message: 'Team already registered.' });
    }

    const teamMembersWithIds = teamMembers.map((member) => ({ _id: member.studentId }));
    const team = new LeagueOfLegendsModel({ teamName, members: teamMembersWithIds });
    try {
      await team.save();
      res.status(201).json({ message: 'Team has been successfully registered!' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid data received. Please check your request.' });
    }
  }

  static async getTeam(req, res) {
    const teamName = req.params.teamName;
    if (!teamName) {
      return res.status(400).json({ message: 'Invalid request. Please provide a team name.' });
    }

    const team = await LeagueOfLegendsModel.findOne({ teamName }).populate('members').lean().exec();
    if (!team) {
      return res.status(404).json({ message: 'No team found with that name.' });
    }
    res.json(team);
  }

  static async getTeams(req, res) {
    const teams = await LeagueOfLegendsModel.find().lean();
    if (!teams.length) {
      return res.status(404).json({ message: 'No teams found.' });
    }
    res.json(teams);
  }
}

module.exports = LOLController;