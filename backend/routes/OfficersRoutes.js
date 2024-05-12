const express = require('express')
const router = express.Router()
const officersController = require('../controllers/OfficerController')
const verifyJWT = require('../middleware/verifyJWT')
const uploads = require('../middleware/upload')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const imageProcessing = require('../utils/imageProcessing')

// router.use(verifyJWT)
router.route('/')
    .post(/*verifyRoles(ROLES_LIST.Admin), */ uploads.single('fileUpload'), officersController.addOfficersList);

    router.get('/byid', officersController.getOfficerById);
    router.put('/update', officersController.updateOfficer);
    router.get('/all', officersController.getOfficers);
    router.post('/create', officersController.createOfficer);
    router.delete('/delete', officersController.deleteOfficer);
module.exports = router;