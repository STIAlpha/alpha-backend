const express = require('express')
const router = express.Router()
const chessController = require('../controllers/chessController')
const verifyJWT = require('../middleware/verifyJWT')
const uploads = require('../middleware/upload')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const imageProcessing = require('../utils/imageProcessing')

router.route('/').get(chessController.getChessEntries)
router.route('/')   .post( chessController.registerToChessEvent)


router.route('/studentName').get(chessController.getChessEntryByName)
    
    
module.exports = router;