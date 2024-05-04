const express = require('express');
const router = express.Router();
const lolController2 = require('../controllers/lolController');

router.route('/').get(lolController2.getTeams)
.post(lolController2.registerTeam);

router.route('/teamName').get(lolController2.getTeam);

module.exports = router;