const express = require('express');
const router = express.Router();
const codmController = require('../controllers/codmController');

router.route('/')
 .get(codmController.getCODMTeams)
 .post(codmController.registerToCODMEvent);

router.route('/teamName')
 .get(codmController.getSingleCODMTeam);

module.exports = router;