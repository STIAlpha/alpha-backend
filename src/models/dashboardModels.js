const mongoose = require('mongoose'); // Import mongoose library
const { UserList } = require('./registrationModels'); // Import the UserList model from registrationModels

// Define a schema for the totals of various dashboard metrics
const totalsSchema = new mongoose.Schema({
  totalMembers: { type: Number, default: 0 }, // Total number of members
  totalOfficers: { type: Number, default: 0 }, // Total number of officers
  eventRegistrants: { type: Number, default: 0 }, // Total number of event registrants
  blogPageViews: { type: Number, default: 0 }, // Total number of blog page views
});

// Define a schema for an event, including a list of registrants
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the event
  registrants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserList' }], // List of registrants
});

// Define a schema for a blog post, including the number of views
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the blog post
  views: { type: Number, default: 0 }, // Number of views
});

// Export the models for the totals, event, and blog schemas
const Dashboard = mongoose.model('Dashboard', totalsSchema);
const Event = mongoose.model('Event', eventSchema);
const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Dashboard, Event, Blog };