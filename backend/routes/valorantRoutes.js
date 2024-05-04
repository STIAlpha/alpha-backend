const express = require('express');
const router = express.Router();
const valorantController = require('../controllers/ValorantController');


router.route('/')
    .get( valorantController.getValorantTeams)
    .post(valorantController.registerToValorantEvent);

router.route('/teamName')
    .get(valorantController.getSingleValorantTeam);

module.exports = router;
