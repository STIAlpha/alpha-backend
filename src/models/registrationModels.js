const mongoose = require('mongoose'); // Import mongoose library

// Define a new schema for a user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  team: { type: String, required: true }, // User's team
  email: { type: String, required: true, unique: true }, // User's email address
  studentID: { type: String, required: true, unique: true }, // User's student ID
  });

// Export the model for the user schema
module.exports = mongoose.model('UserList', userSchema);