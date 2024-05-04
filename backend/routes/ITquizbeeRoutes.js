const express = require('express')
const router = express.Router()
const ITQuizBeeController = require('../controllers/quizBeeITController')

router.route('/')
    .get(ITQuizBeeController.getITquizbeeEntries)
    .post( ITQuizBeeController.registerToITquizbeeEvent)


router.route('/studentName')
    .get( ITQuizBeeController.getITquizbeeEntryByName)
    
module.exports = router;