const express = require('express');
const router = express.Router();
const valorantController = require('../controllers/ValorantController');
const verifyJWT = require('../middleware/verifyJWT');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.use(verifyJWT);

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), valorantController.getValorantTeams)
    .post(verifyRoles(ROLES_LIST.Admin), valorantController.registerToValorantEvent);

router.route('/:teamName')
    .get(verifyRoles(ROLES_LIST.Admin), valorantController.getSingleValorantTeam);

module.exports = router;
