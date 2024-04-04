const Dashboard = require('../models/dashboardModels');
const UserList = require('../models/registrationModels').UserList;
const Event = require('../models/dashboardModels');
const Blog = require('../models/dashboardModels');

// Get the total number of members, officers, event registrants, and blog page views
exports.getTotals = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({});
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a list of users sorted by the specified field
exports.getUserList = async (req, res) => {
  try {
    const { sortBy } = req.params;
    const userList = await UserList.find({})
     .sort({ [sortBy]: 1 })
     .exec();
    res.json(userList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserList.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserList.findByIdAndDelete(id);
    await Dashboard.updateOne(
      {},
      { $inc: { totalMembers: -1 } },
      { new: true }
    );
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};