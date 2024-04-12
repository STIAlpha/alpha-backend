const express = require('express');
const router = express.Router();
const {
    viewUser,
    viewAllUsers,
    deleteUser,
    updateUser
   } = require('../controllers/dashboardController')
   
// Get All Users from document
router.get('/all-users',viewAllUsers);

//SAMPLE
// Get User from document
router.get('/user/:id', viewUser);

// PUT (For @ Neil Abadilla)
// Update a user by ID
router.put('/user/:id', updateUser);

// DELETE (for @Ed Hibaler )
// Delete a user by ID
router.delete('/user/:id', deleteUser);

module.exports = router;