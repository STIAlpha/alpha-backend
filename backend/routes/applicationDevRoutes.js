const express = require("express");
const router = express.Router();
const applicationDevController = require("../controllers/applicationDevController");
const verifyJWT = require("../middleware/verifyJWT");
const uploads = require("../middleware/upload");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const imageProcessing = require("../utils/imageProcessing");

// Apply JWT verification for all routes in this router
router.use(verifyJWT);

// Routes for application development event handling
router
  .route("/")
  .get(/*verifyRoles(ROLES_LIST.Admin), */ applicationDevController.getADEntries) // Get all teams, admin only

  .post(
    /*verifyRoles(ROLES_LIST.Admin), */
    applicationDevController.registerToADEvent
  ); // Register a new team, admin only

router
  .route("/:teamName")
  .get(
    /*verifyRoles(ROLES_LIST.Admin), */
    applicationDevController.getADEntryByTeamName
  ); // Get a single team by team name, admin only

module.exports = router;
