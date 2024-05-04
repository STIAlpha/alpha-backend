const mongoose = require("mongoose");

// Define the application development event schema

const appDevSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  members: [{ type: String }], // Members' names are stored in a single string, separated by commas
  description: { type: String, required: true }, // Brief description of the application concept
  /*
  agreement: {
    type: Boolean,
    required: true,
    validate: {
      validator: function (v) {
        return v; // Ensures the agreement is true (i.e., they have agreed)
      },
      message: "You must agree to the terms and conditions.",
    },
  },
  */
});

// Create the model for the application development event
const ApplicationDev = mongoose.model("Application Development", appDevSchema);

module.exports = ApplicationDev;
