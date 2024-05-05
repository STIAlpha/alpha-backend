const asyncHandler = require("express-async-handler");
const Members = require("../models/Members");
const GameJam = require("../models/GameJam");

class GameJamController {
  // CREATE
  static registerToGameJam = asyncHandler(async (req, res) => {
    const {
      teamName,
      teamRepEmail,
      members,
      themeVote,
    } = req.body;

    if (
     !teamName ||
     !teamRepEmail ||
     !members ||
     !themeVote
    ) {
      return res.status(400).json({ message: "All fields are required" });
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

    const validTeam = await GameJam.findOne({ teamName}).lean().exec();



    if (validTeam) {
      return res.status(400).json({ message: "Not a valid team Name" });
    }

    const duplicate = await GameJam.findOne({ teamRepEmail: teamRepEmail.toLowerCase() }).lean().exec();

    if (duplicate) {
      return res
       .status(409)
       .json({ message: "Team representative already registered a team." });
    }



    const gameJamEntryObject = {
      teamName,
      teamRepEmail,
      members,
      themeVote,
    };

    try {
      const gameJamEntry = await GameJam.create(gameJamEntryObject);
      res.status(201).json({
        message: "Team has been successfully registered!",
        data: gameJamEntry,
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid data received" });
    }
  });

  // GET ALL TEAMS
  static getAllTeams = asyncHandler(async (req, res) => {
    try {
      const teams = await GameJam.find().lean().exec();
      if (!teams.length) {
        return res.status(404).json({ message: "No teams found" });
      }
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET SINGLE TEAM
  static getSingleTeam = asyncHandler(async (req, res) => {
    const { teamName } = req.body;

    if (!teamName) {
      return res.status(400).json({ message: "Team name is required" });
    }

    try {
      const team = await GameJam.findOne({ teamName }).lean().exec();
      if (!team) {
        return res.status(404).json({ message: "No team found" });
      }
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}

module.exports = GameJamController;