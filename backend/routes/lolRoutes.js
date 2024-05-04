const express = require('express')
const router = express.Router()
const lolController = require('../controllers/lolController')
const verifyJWT = require('../middleware/verifyJWT')
const uploads = require('../middleware/upload')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const imageProcessing = require('../utils/imageProcessing')

router.use(verifyJWT)
router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), lolController.getLOLTeam)
    .post(verifyRoles(ROLES_LIST.Admin), lolController.registerToLOLEvent);

router.route('/:teamName')
.get(verifyRoles(ROLES_LIST.Admin), lolController.getSingleLOLTeam)
    
module.exports = router;