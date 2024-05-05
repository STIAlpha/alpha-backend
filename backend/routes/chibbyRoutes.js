const express = require('express');
const router = express.Router();
const chibbyController = require('../controllers/chibbyController');

router.route('/')
 .get(chibbyController.getChibbyEntries)
 .post(chibbyController.registerToChibbyEvent);

router.route('/studentName')
 .get(chibbyController.getChibbyEntryByName);

module.exports = router;