const express = require('express'); // Import express library
const router = express.Router(); // Create a new router instance
const registrationController = require('../controllers/registrationController'); // Import registration controller

// Create a new user
router.post('/', registrationController.createUser);

module.exports = router; // Export the router instance