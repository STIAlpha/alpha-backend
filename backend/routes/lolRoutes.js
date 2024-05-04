const express = require('express')
const router = express.Router()
const lolController = require('../controllers/lolController')

router.route('/') .get(lolController.getTeams)
 .post(lolController.registerTeam)

router.route('/:teamName').get(lolController.getTeam)

module.exports = router;