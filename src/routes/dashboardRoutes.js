const express = require('express'); // Import express library
const router = express.Router(); // Create a new router instance
const dashboardController = require('../controllers/dashboardController'); // Import dashboard controller

// Get total number of users, posts, and comments
router.get('/totals', dashboardController.getTotals);

// Get list of users sorted by specified field
router.get('/user-list/:sortBy', dashboardController.getUserList);

// Update a user by ID
router.put('/user-list/:id', dashboardController.updateUser);

// Delete a user by ID
router.delete('/user-list/:id', dashboardController.deleteUser);

module.exports = router; // Export the router instance