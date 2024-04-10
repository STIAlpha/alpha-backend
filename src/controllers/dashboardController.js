const UserList = require('../models/registrationModels');

const mongoose = require('mongoose');

// View all Users from UserLists (@Keith)
const viewallUsers = async (req, res) => {
  try {
    // insert codes here
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET one user by objectID SAMPLE
const viewUser = async (req, res) => {
  const { id } = req.params
    try{
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user (wrong objectid'})
      }

      const user = await UserList.findById(id)

      if (!user) {
        return res.status(404).json({error: 'No such user'})
      }

      res.status(200).json(user)
    }catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


// Update a user by objectID @ Neil
const updateUser = async (req, res) => {
  try {
    // insert codes here
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by objectID @Ed
const deleteUser = async (req, res) => {
  try {
    // insert codes here
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  viewUser,
  deleteUser,
  updateUser,
  viewallUsers
}