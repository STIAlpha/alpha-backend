const express = require('express');
const router = express.Router();
const WebDevController = require('../controllers/webdevController');
const verifyJWT = require('../middleware/verifyJWT');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.use(verifyJWT);

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), WebDevController.getWebDevTeams)
    .post(verifyRoles(ROLES_LIST.Admin), WebDevController.registerToWebDevEvent);
    
router.route('/:teamName')
    .get(verifyRoles(ROLES_LIST.Admin), WebDevController.getSingleWebDevTeam);
    
module.exports = router;
