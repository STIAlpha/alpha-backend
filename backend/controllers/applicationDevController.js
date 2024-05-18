const asyncHandler = require("express-async-handler");
const exceljs = require("exceljs");
const fs = require("fs");
const path = require("path");
const Appdev = require("../models/Appdev");

class ApplicationDevtController {
  // CREATE
  static registerToApplicationDev = asyncHandler(async (req, res) => {
    const { teamName, memberNames, description } = req.body;

    if (!teamName || !memberNames || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const membersNamesArray = memberNames.trim().split(',').map(name => name.trim());


    const duplicate = await Appdev.findOne({ teamName }).lean().exec();

    if (duplicate) { 
      return res.status(409).json({ message: "Team already registered." });
    }

    const adEventObject = { teamName,members:membersNamesArray, description };

    // Create and store new AD event entry
    const adEventEntry = await Appdev.create(adEventObject);

    if (adEventEntry) {
      return res
        .status(200)
        .json({ message: "Team has been successfully registered!" });
    } else {
      return res.status(400).json({ message: "Invalid data received" });
    }
  });

  // READ ALL
  static getADEntries = asyncHandler(async (req, res) => {
    const adEntries = await Appdev.find().lean();

    if (!adEntries.length) {
      return res.status(400).json({ message: "No entries found" });
    }

    res.json(adEntries);
  });

  // READ SINGLE
  static getADEntryByTeamName = asyncHandler(async (req, res) => {
    const {teamName} = req.body;

    if (!teamName) {
      return res.status(400).json({ message: "Enter a team name." });
    }

    const team = await Appdev.findOne({ teamName }).lean().exec();

    if (!team) {
      return res.status(400).json({ message: "No entry found for this team" });
    }

    res.json(team);
  });
}

module.exports = ApplicationDevtController;
