const express = require('express')
const router = express.Router()
const mLBBController = require('../controllers/mLBBController')
const verifyJWT = require('../middleware/verifyJWT')
const uploads = require('../middleware/upload')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const imageProcessing = require('../utils/imageProcessing')

router.use(verifyJWT)
router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), mLBBController.getMLBBTeam)
    .post(verifyRoles(ROLES_LIST.Admin), mLBBController.registerToMLBBEvent);

router.route('/:teamName')
.get(verifyRoles(ROLES_LIST.Admin), mLBBController.getSingleMLBBTeam)
    
module.exports = router;