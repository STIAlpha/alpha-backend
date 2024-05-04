const express = require('express');
const router = express.Router();
const tekkenController = require('../controllers/TekkenController');
const verifyJWT = require('../middleware/verifyJWT');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.use(verifyJWT);

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), tekkenController.getTekkenEntries)
    .post(verifyRoles(ROLES_LIST.Admin), tekkenController.registerToTekkenEvent);

router.route('/:fullName')
    .get(verifyRoles(ROLES_LIST.Admin), tekkenController.getSingleTekkenEntry);

module.exports = router;
