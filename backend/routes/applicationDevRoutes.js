const express = require("express");
const router = express.Router();
const applicationDevController = require("../controllers/applicationDevController");


// Apply JWT verification for all routes in this router

// Routes for application development event handling
router.route("/").get(/*verifyRoles(ROLES_LIST.Admin), */ applicationDevController.getADEntries)

  .post(applicationDevController.registerToApplicationDev); 

router.route("/teamName").get(applicationDevController.getADEntryByTeamName); 

module.exports = router;
