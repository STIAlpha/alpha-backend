const mongoose = require('mongoose')

const officerSchema = new mongoose.Schema(
  {
    name: {
      type: String    },
    position: {
      type: String
    },
    department: {
      type: String
    },
    section: {
      type: String
    },
    image: {
      type: String
    },
    bio: {
      type: String
    },
    githubLink: {
      type: String,
    },
    fbLink: {
      type: String,
    },
    email: {
      type: String
    },
  },
  { timestamps: true }
);

const Officer =
  mongoose.models.Officer || mongoose.model("Officer", officerSchema);
  module.exports = Officer;
