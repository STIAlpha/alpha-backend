const express = require('express')
const router = express.Router()
const ITQuizBeeController = require('../controllers/quizBeeITController')
const verifyJWT = require('../middleware/verifyJWT')
const uploads = require('../middleware/upload')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const imageProcessing = require('../utils/imageProcessing')

router.use(verifyJWT)
router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), ITQuizBeeController.getITquizbeeEntries)
    .post(verifyRoles(ROLES_LIST.Admin), ITQuizBeeController.registerToITquizbeeEvent)


router.route('/:studentName')
    .get(verifyRoles(ROLES_LIST.Admin), ITQuizBeeController.getITquizbeeEntryByName)
    
module.exports = router;