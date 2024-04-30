const express = require('express')
const router = express.Router()
const attendanceController = require('../controllers/attendanceController')
const verifyJWT = require('../middleware/verifyJWT')
const uploads = require('../middleware/upload')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const imageProcessing = require('../utils/imageProcessing')

// router.use(verifyJWT)
router.route('/addattendance').post(/*verifyRoles(ROLES_LIST.Admin), */ attendanceController.addToAttendance);
    router.route('/checkattendance').get(attendanceController.CheckAttendance);
    router.route('/getAllAttendance').get(attendanceController.getAllAttendance);

    
module.exports = router;