const express = require('express')
const router = express.Router()
const chessController = require('../controllers/chessController')

router.route('/').get(chessController.getChessEntries)
router.route('/')   .post( chessController.registerToChessEvent)


router.route('/studentName').get(chessController.getChessEntryByName)
    
    
module.exports = router;