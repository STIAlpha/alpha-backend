const express = require('express');
const router = express.Router();
const WebDevController = require('../controllers/webdevController');


router.route('/')
    .get( WebDevController.getWebDevTeams)
    .post(WebDevController.registerToWebDevEvent);
    
router.route('/teamName')
    .get( WebDevController.getSingleWebDevTeam);
    
module.exports = router;
