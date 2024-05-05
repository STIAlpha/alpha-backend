const express = require('express');
const router = express.Router();
const ideathonController = require('../controllers/ideathonController');

router.route('/')
 .get(ideathonController.getIdeathonTeams)
 .post(ideathonController.registerToIdeathonEvent)

router.route('/teamName')
 .get(ideathonController.getSingleIdeathonTeam)


module.exports = router;