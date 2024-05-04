const express = require('express');
const router = express.Router();
const codmController = require('../controllers/codmController');
const verifyJWT = require('../middleware/verifyJWT');
const uploads = require('../middleware/upload');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');
const imageProcessing = require('../utils/imageProcessing');

router.use(verifyJWT);

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), CODMController.getCODMTeams)
    .post(verifyRoles(ROLES_LIST.Admin), CODMController.registerToCODMEvent);
    
router.route('/:teamName')
    .get(verifyRoles(ROLES_LIST.Admin), CODMController.getSingleCODMTeam);
    
module.exports = router;
