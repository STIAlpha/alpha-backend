const asyncHandler = require("express-async-handler");
const exceljs = require("exceljs");
const fs = require("fs");
const path = require("path");
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

    const duplicate = await Members.findOne({ teamRepEmail }).lean().exec();

    if (duplicate) {
      return res
        .status(409)
        .json({ message: "Team representative already registered a team." });
    }

    const gameJamEntry = await GameJam.create({
      teamName,
      teamRepEmail,
      memberNames,
      programsAndSections,
      themeVote,
    });

    if (gameJamEntry) {
      return res
        .status(201)
        .json({
          message: "Team has been successfully registered!",
          data: gameJamEntry,
        });
    } else {
      return res.status(400).json({ message: "Invalid data received" });
    }
  });

  // GET ALL TEAMS
  static getAllTeams = asyncHandler(async (req, res) => {
    const teams = await GameJam.find().lean().exec();

    if (!teams.length) {
      return res.status(404).json({ message: "No teams found" });
    }

    res.json(teams);
  });

  // GET SINGLE TEAM
  static getSingleTeam = asyncHandler(async (req, res) => {
    const { teamName } = req.params;

    if (!teamName) {
      return res.status(400).json({ message: "Team name is required" });
    }

    const team = await GameJam.findOne({ teamName }).lean().exec();

    if (!team) {
      return res.status(404).json({ message: "No team found" });
    }

    res.json(team);
  });
}

module.exports = GameJamController;
