const express = require('express');
const router = express.Router();
const wildriftController = require('../controllers/wildriftController');

router.route('/')
 .get(wildriftController.getWildriftTeams)
 .post(wildriftController.registerToWildriftEvent);

router.route('/:teamName')
 .get(wildriftController.getSingleWildriftTeam);

module.exports = router;