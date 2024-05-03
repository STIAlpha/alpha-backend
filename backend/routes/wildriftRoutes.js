const express = require('express')
const router = express.Router()
const wildriftController = require('../controllers/wildriftController')
const verifyJWT = require('../middleware/verifyJWT')
const uploads = require('../middleware/upload')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const imageProcessing = require('../utils/imageProcessing')

router.use(verifyJWT)
router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), wildriftController.getWildriftTeam)
    .post(verifyRoles(ROLES_LIST.Admin), wildriftController.registerToWildriftEvent)
    
router.route('/:teamName')
    .get(verifyRoles(ROLES_LIST.Admin), wildriftController.getSingleWildriftTeam)
    
    
module.exports = router;