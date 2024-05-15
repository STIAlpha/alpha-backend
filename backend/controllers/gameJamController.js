const asyncHandler = require("express-async-handler");
const Members = require("../models/Members");
const GameJam = require("../models/GameJam");

class GameJamController {
  // CREATE
  static registerToGameJam = asyncHandler(async (req, res) => {
    const {
      teamName,
      teamRepEmail,
      membersNames,membersCourses,
      themeVote,
    } = req.body;

    if (
     !teamName ||
     !teamRepEmail ||
     !membersNames ||!membersCourses||
     !themeVote
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }



    const membersNamesArray = membersNames.split(',').map(name => name.trim());
    const membersCoursesArray = membersCourses.split(',').map(course => course.trim());

    if (membersNamesArray.length !== membersCoursesArray.length) {
      return res.status(400).json({ message: 'Members names and courses must have the same number of entries.' });
    }

    //map each string to respective data
    const members = membersNamesArray.map((name, index) => ({
      name,
      coursesAndSections: membersCoursesArray[index],
    }));



 
    const student = await Members.findOne({ student_email: teamRepEmail }).lean().exec();
    if (!student) {
        return res.status(400).json({ message: `Student with email ${teamRepEmail} not found.` });
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