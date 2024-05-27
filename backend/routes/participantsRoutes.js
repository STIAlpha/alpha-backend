const express = require('express');
const router = express.Router();
const participantsController = require('../controllers/participantsController');

router.route('/')
 .get(participantsController.getParticipantCounts);

module.exports = router;