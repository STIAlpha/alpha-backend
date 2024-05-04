const express = require('express')
const router = express.Router()
const CSQuizBeeController = require('../controllers/quizbeeCSController')
const verifyJWT = require('../middleware/verifyJWT')
const uploads = require('../middleware/upload')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const imageProcessing = require('../utils/imageProcessing')

router.use(verifyJWT)
router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), CSQuizBeeController.getCSquizbeeEntries)
    .post(verifyRoles(ROLES_LIST.Admin), CSQuizBeeController.registerToCSquizbeeEvent)


router.route('/:studentName')
    .get(verifyRoles(ROLES_LIST.Admin), CSQuizBeeController.getCSquizbeeEntryByName)
    
module.exports = router;