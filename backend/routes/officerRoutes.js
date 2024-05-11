// officerRoutes.js
const express = require('express');
const router = express.Router();
const OfficerController = require('./officerController');

router.get('/:id', OfficerController.getOfficerById);
router.put('/:id', OfficerController.updateOfficer);
router.get('/', OfficerController.getOfficers);
router.post('/', OfficerController.createOfficer);
router.delete('/', OfficerController.deleteOfficer);

module.exports = router;