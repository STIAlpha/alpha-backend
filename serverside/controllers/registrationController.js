const UserList = require('../models/registrationModels'); // Import the UserList model

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new UserList(req.body); // Create a new instance of the UserList model with the request body
    await newUser.save(); // Save the new user to the database
    res.status(201).json(newUser); // Return the new user as a response with a 201 status code
  } catch (error) {
    res.status(400).json({ message: error.message }); // Return an error message with a 400 status code if there is a problem creating the user
  }
};