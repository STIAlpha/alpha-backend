const asyncHandler = require('express-async-handler')
const exceljs = require('exceljs')
const fs = require('fs')
const path = require('path')
const Members = require('../models/Members');
const LeagueOfLegends = require('../models/LOL');

class LOLController {
    // CREATE
    static registerToLOLEvent = asyncHandler(async (req, res) => {
    const { teamName, studentEmail, teamMembers } = req.body;

    if (!teamName || !studentEmail || !Array.isArray(teamMembers) || !teamMembers.length ) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validStudentEmail = await Members.findOne({ studentEmail }).lean().exec();
    
    if (!validStudentEmail) {
        return res.status(400).json({ message: 'Not a valid student email' });
    }

    const duplicate = await LeagueOfLegends.findOne({ studentEmail }).lean().exec();

    if(duplicate){
        return res.status(400).json({ message: 'Team already registered.' });
    }

    const validatedteamMembers = teamMembers.map((teamMembers) => {
        // Perform validation on each participant object if needed
        // (e.g., ensure required fields are present)
        return teamMembers;
      });
      
    if (validatedteamMembers.length !== 5) {
        return res.status(400).json({ message: 'A team must have exactly 5 members' });
    }    

    const lolEntryObject = { teamName, studentEmail, teamMembers }

    const lolEntry = await LeagueOfLegends.create(lolEntryObject)

    if(lolEntry){
        return res.status(200).json({message: 'Team has been succesfully registered!'})
    }else{
        return res.status(400).json({message: 'Invalid data recieved'})
    }
  });

  static getSingleLOLTeam = asyncHandler(async (req, res) => {

    const teamName = req.params.teamName;

    if(!teamName) {
        return res.status(400).json({message: '.'});
    }

    const lolTeam = await LeagueOfLegends.findOne({teamName}).lean().exec()

    if(!lolTeam) {
        return res.status(400).json({message: 'No team found'})
    }
    res.json(lolTeam)

  })

  static getLOLTeam = asyncHandler(async (req, res) => {

    const lolTeams = await LeagueOfLegends.find().lean()

    // If no users 
    if (!lolTeams?.length) {
        return res.status(400).json({ message: 'No teams found' })
    }

    res.json(lolTeams);

});
}
    
    
module.exports = LOLController;
