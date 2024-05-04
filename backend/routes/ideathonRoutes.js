const express = require('express')
const router = express.Router()
const ideathonController = require('../controllers/ideathonController')
const verifyJWT = require('../middleware/verifyJWT')
const uploads = require('../middleware/upload')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const imageProcessing = require('../utils/imageProcessing')

router.use(verifyJWT)
router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), ideathonController.getIdeathonTeam)
    .post(verifyRoles(ROLES_LIST.Admin), ideathonController.registerToIdeathonEvent)

router.route('/:teamName')
    .get(verifyRoles(ROLES_LIST.Admin), ideathonController.getSingleIdeathonTeam)


module.exports = router;