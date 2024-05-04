const express = require('express')
const router = express.Router()
const attendanceController = require('../controllers/attendanceController')

// router.use(verifyJWT)
router.route('/addattendance').post(/*verifyRoles(ROLES_LIST.Admin), */ attendanceController.addToAttendance);
    router.route('/checkattendance').get(attendanceController.CheckAttendance);
    router.route('/getAllAttendance').get(attendanceController.getAllAttendance);

    
module.exports = router;