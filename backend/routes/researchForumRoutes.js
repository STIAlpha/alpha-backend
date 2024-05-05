const express = require('express');
const router = express.Router();
const researchForumController = require('../controllers/researchForumController');

router.route('/')
 .get(researchForumController.getResearchForumTeams)
 .post(researchForumController.registerToResearchForumEvent);

router.route('/nameSchool')
 .get(researchForumController.getSingleResearchForumTeam);

module.exports = router;