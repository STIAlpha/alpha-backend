const mongoose = require("mongoose");

// Define the game jam event schema
const gameJamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamRepEmail: { type: String, required: true },
  memberNames: { type: String, required: true }, // Assuming storage as a single string of names separated by commas
  programsAndSections: { type: String, required: true }, // Assuming storage as a single string of 'Surname_Section' separated by commas
  themeVote: {
    type: String,
    required: true,
    enum: [
      "Digital Worlds",
      "Algorithm Adventures",
      "Journey to the East",
      "Earth Matters",
    ],
  },
});

// Create the model from the schema
const GameJam = mongoose.model("GameJamEvent", gameJamSchema);

module.exports = GameJam;
