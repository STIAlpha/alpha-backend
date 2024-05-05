const express =require('express');
const router = express.Router();
const mLBBController = require('../controllers/mLBBController');

router.route('/')
 .get(mLBBController.getMLBBTeams)
 .post(mLBBController.registerToMLBBEvent);

router.route('/teamName')
 .get(mLBBController.getSingleMLBBTeam);

module.exports = router;