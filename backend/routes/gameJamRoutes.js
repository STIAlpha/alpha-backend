const express = require("express");
const router = express.Router();
const gameJamController = require("../controllers/gameJamController");

// Routes for handling game jam entries
router
 .route("/")
 .get(gameJamController.getAllTeams)
 .post(gameJamController.registerToGameJam);

// Route for handling specific game jam team by team name
router
 .route("/:teamName")
 .get(gameJamController.getSingleTeam);

module.exports = router;