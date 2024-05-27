const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coursesAndSections: { type: String, required: true },
  discordName: { type: String, required: true },
  email: { type: String, required: true },
  tagline: { type: String, required: true },
});


const LeagueOfLegendsSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  members: [{ type: StudentSchema}]
});

const LeagueOfLegends = mongoose.model('LOLPc', LeagueOfLegendsSchema);

module.exports =  LeagueOfLegends ;