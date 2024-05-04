const express = require("express");
const router = express.Router();
const applicationDevController = require("../controllers/applicationDevController");
const verifyJWT = require("../middleware/verifyJWT");
const uploads = require("../middleware/upload");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const imageProcessing = require("../utils/imageProcessing");

// Apply JWT verification for all routes in this router

// Routes for application development event handling
router.route("/").get(/*verifyRoles(ROLES_LIST.Admin), */ applicationDevController.getADEntries)

  .post(applicationDevController.registerToApplicationDev); 

router.route("/teamName").get(applicationDevController.getADEntryByTeamName); 

module.exports = router;
