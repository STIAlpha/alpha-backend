const asyncHandler = require("express-async-handler");
const Members = require("../models/Members");
const GameJam = require("../models/GameJam");

class GameJamController {
  // CREATE
  static registerToGameJam = asyncHandler(async (req, res) => {
    const {
      teamName,
      teamRepEmail,
      memberNames,
      programsAndSections,
      themeVote,
    } = req.body;

    if (
     !teamName ||
     !teamRepEmail ||
     !memberNames ||
     !programsAndSections ||
     !themeVote
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validTeamRepEmail = await Members.findOne({ student_email: teamRepEmail.toLowerCase() }).lean().exec();

    if (!validTeamRepEmail) {
      return res.status(400).json({ message: "Not a valid team representative email" });
    }

    const duplicate = await GameJam.findOne({ teamRepEmail: teamRepEmail.toLowerCase() }).lean().exec();

    if (duplicate) {
      return res
       .status(409)
       .json({ message: "Team representative already registered a team." });
    }

    const members = memberNames.map((member, index) => ({
      name: member,
      coursesAndSections: programsAndSections[index],
    }));

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
    const { teamName } = req.params;

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