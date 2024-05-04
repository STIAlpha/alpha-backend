const express = require('express')
const router = express.Router()
const CSQuizBeeController = require('../controllers/quizbeeCSController')


router.route('/').get(/*verifyRoles(ROLES_LIST.Admin), */ CSQuizBeeController.getCSquizbeeEntries)
router.route('/register').post(/*verifyRoles(ROLES_LIST.Admin), */CSQuizBeeController.registerToCSquizbeeEvent)


router.route('/:studentName').get(/*verifyRoles(ROLES_LIST.Admin), */CSQuizBeeController.getCSquizbeeEntryByName)
    
module.exports = router;