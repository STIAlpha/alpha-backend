const express = require('express')
const router = express.Router()
const TekkenController = require('../controllers/tekkenController')

router.route('/').get(TekkenController.getTekkenEntries);
 router.route('/').post(TekkenController.registerToTekkenEvent);

router.route('/fullName').get(TekkenController.getSingleTekkenEntry);
module.exports = router;
