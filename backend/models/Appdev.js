const mongoose = require("mongoose");

// Define the application development event schema
const appDevEventSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  memberNames: { type: String, required: true }, // Members' names are stored in a single string, separated by commas
  description: { type: String, required: true }, // Brief description of the application concept
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
});

// Create the model for the application development event
const ADEvent = mongoose.model("ADEvent", appDevEventSchema);

module.exports = ADEvent;
