// beyondRoutes.js
const express = require('express');
const router = express.Router();
const BeyondController = require('../controllers/beyondController');

router.post('/', BeyondController.registerToBeyondEvent);
router.get('/teamName', BeyondController.getSingleBeyondTeam);
router.get('/', BeyondController.getBeyondTeams);

module.exports = router;