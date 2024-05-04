const express = require("express");
const router = express.Router();
const gameJamController = require("../controllers/gameJamController");
const verifyJWT = require("../middleware/verifyJWT");
const uploads = require("../middleware/upload");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const imageProcessing = require("../utils/imageProcessing");

router.use(verifyJWT);

// Routes for handling game jam entries
router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), gameJamController.getAllTeams)
  .post(
    verifyRoles(ROLES_LIST.Admin),
    uploads.single("document"),
    gameJamController.registerToGameJam
  ); // If document upload is necessary

// Route for handling specific game jam team by team name
router
  .route("/:teamName")
  .get(verifyRoles(ROLES_LIST.Admin), gameJamController.getSingleTeam);

module.exports = router;
