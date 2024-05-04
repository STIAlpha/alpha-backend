const express = require('express')
const router = express.Router()
const researchForumController = require('../controllers/researchForumController')
const verifyJWT = require('../middleware/verifyJWT')
const uploads = require('../middleware/upload')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')
const imageProcessing = require('../utils/imageProcessing')

router.use(verifyJWT)
router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), researchForumController.getResearchForumTeam)
    .post(verifyRoles(ROLES_LIST.Admin), researchForumController.registerToResearchForumEvent)

router.route('/:teamName')
    .get(verifyRoles(ROLES_LIST.Admin), researchForumController.getSingleResearchForumTeam)


module.exports = router;