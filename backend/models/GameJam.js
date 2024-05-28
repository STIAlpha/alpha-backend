const mongoose = require("mongoose");

const Student = new mongoose.Schema({
  name: { type: String, required: true },
  coursesAndSections: { type: String, required: true },
});

const gameJamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamRepEmail: { type: String, required: true },
  members: { type: [Student], required: true },
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

const GameJam = mongoose.model("GameDevelopment", gameJamSchema);

module.exports = GameJam;