const asyncHandler = require('express-async-handler')
const Members = require("../models/Members");
const LeagueOfLegendsModel = require('../models/LOL');

class LOLController {
  // CREATE
   static registerTeam = asyncHandler(async (req, res) => {
    const { teamName, members } = req.body;

    if (!teamName || !members) {
        return res.status(400).json({ message: 'Invalid request. Please provide team name and team members.' });
    }

    // Check for duplicate emails in members
    const memberEmails = new Set();
    for (const member of members) {
        if (memberEmails.has(member.email)) {
            return res.status(400).json({ message: 'Duplicate emails found in team members.' });
        }
        memberEmails.add(member.email);
    }

    // Check if each member exists in the database
    for (const member of members) {
        const student = await Members.findOne({ email: member.email }).lean().exec();
        if (!student) {
            return res.status(400).json({ message: `Student with email ${member.email} not found.` });
        }
    }

    const duplicate = await LeagueOfLegendsModel.findOne({ teamName }).lean().exec();
    if (duplicate) {
        return res.status(400).json({ message: 'Team already registered.' });
    }

    const team = new LeagueOfLegendsModel({ teamName, members });
    try {
        await team.save();
        res.status(201).json({ message: 'Team has been successfully registered!' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data received. Please check your request.' });
    }
});

  static getTeam =  asyncHandler(async (req, res) => {
    const {teamName} = req.body;
    if (!teamName) {
      return res.status(400).json({ message: 'Invalid request. Please provide a team name.' });
    }

    const team = await LeagueOfLegendsModel.findOne({ teamName }).lean().exec();
    if (!team) {
      return res.status(404).json({ message: 'No team found with that name.' });
    }
    res.json(team);
  });

  static getTeams=  asyncHandler(async (req, res) => {
    const teams = await LeagueOfLegendsModel.find().lean();
    if (!teams?.length) {
      return res.status(404).json({ message: 'No teams found.' });
    }
    res.json(teams);
  });

 


}

module.exports = LOLController;