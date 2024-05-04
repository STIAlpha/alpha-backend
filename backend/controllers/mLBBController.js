const asyncHandler = require('express-async-handler')
const exceljs = require('exceljs')
const fs = require('fs')
const path = require('path')
const Members = require('../models/Members');
const MobileLegends = require('../models/MLBB');

class MLBBController {
    // CREATE
    static registerToMLBBEvent = asyncHandler(async (req, res) => {
    const { teamName, studentEmail, mobileNumber, teamMembers } = req.body;

    if (!teamName || !studentEmail || !mobileNumber || !Array.isArray(teamMembers) || !teamMembers.length ) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validStudentEmail = await MobileLegends.findOne({ studentEmail }).lean().exec();
    
    if (!validStudentEmail) {
        return res.status(400).json({ message: 'Not a valid student email' });
    }

    const duplicate = await MobileLegends.findOne({ studentEmail }).lean().exec();

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

    const mLBBEntryObject = {  teamName, studentEmail, mobileNumber, teamMembers  }

    const mLBBEntry = await MobileLegends.create(mLBBEntryObject)

    if(mLBBEntry){
        return res.status(200).json({message: 'Team has been succesfully registered!'})
    }else{
        return res.status(400).json({message: 'Invalid data recieved'})
    }
  });

  static getSingleMLBBTeam = asyncHandler(async (req, res) => {

    const teamName = req.params.teamName;

    if(!teamName) {
        return res.status(400).json({message: '.'});
    }

    const mLBBTeam = await MobileLegends.findOne({teamName}).lean().exec()

    if(!mLBBTeam) {
        return res.status(400).json({message: 'No team found'})
    }
    res.json(mLBBTeam)

  })

  static getMLBBTeam = asyncHandler(async (req, res) => {

    const mLBBTeams = await MobileLegends.find().lean()

    // If no users 
    if (!mLBBTeams?.length) {
        return res.status(400).json({ message: 'No teams found' })
    }

    res.json(mLBBTeams);

});
}
    
    
module.exports = MLBBController;
