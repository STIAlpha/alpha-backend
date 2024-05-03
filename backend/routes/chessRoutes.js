const express = require('express')
const router = express.Router()
const chessController = require('../controllers/chessController')
const verifyJWT = require('../middleware/verifyJWT')
const uploads = require('../middleware/upload')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const imageProcessing = require('../utils/imageProcessing')

router.use(verifyJWT)
router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), chessController.getChessEntries)
    .post(verifyRoles(ROLES_LIST.Admin), chessController.registerToChessEvent)


router.route('/:studentName')
    .get(verifyRoles(ROLES_LIST.Admin), chessController.getChessEntryByName)
    
    
module.exports = router;