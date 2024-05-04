const asyncHandler = require('express-async-handler')
const exceljs = require('exceljs')
const fs = require('fs')
const path = require('path')
const Members = require('../models/Members');
const Ideathon = require('../models/Ideathon');

class ideathonController {
    // CREATE
    static registerToIdeathonEvent = asyncHandler(async (req, res) => {
    const { teamName, memberName, memberYearSection, teamRepresentativeEmailAddress } = req.body;

    if (!teamName || !Array.isArray(memberName) || !memberName.length || !Array.isArray(memberYearSection) || !memberYearSection.length || !teamRepresentativeEmailAddress ) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validteamRepresentativeEmailAddress = await Members.findOne({teamRepresentativeEmailAddress}).lean().exec()

    if(!validteamRepresentativeEmailAddress) {
        
        return res.status(400).json({message: 'Not a valid team representative email address'})
    }

    const duplicate = await Ideathon.findOne({ teamRepresentativeEmailAddress }).lean().exec();

    if(duplicate) {
        return res.status(409).json({message: 'Email already registered.'});
    }

    const validatedMemberName = memberName.map((memberName) => {
        // Perform validation on each participant object if needed
        // (e.g., ensure required fields are present)
        return memberName;
      });

      if (validatedMemberName.length !== 5) {
        return res.status(400).json({ message: 'A team must have exactly 5 members' });
      }

      const ideathonEntryObject = {
        teamName,
        teamRepresentativeEmailAddress,
        memberName: validatedMemberName, // Include validated participants array
      };

     // Create and store new chess entry
     const ideathonEntry = await Wildrift.create(ideathonEntryObject)

     if(ideathonEntry) {
        return res.status(200).json({message: 'Team has been successfully registered!'})
     }else {
        return res.status(400).json({message: 'Invalid data received'})
     }   
  });

  static getSingleIdeathonTeam = asyncHandler(async (req, res) => {

    const teamName = req.params.teamName;

    if(!teamName) {
        return res.status(400).json({message: '.'});
    }

    const IdeathonTeam = await Ideathon.findOne({memberName}).lean().exec()

    if(!IdeathonTeam ) {
        return res.status(400).json({message: 'No team found'})
    }
    res.json(IdeathonTeam)


})

static getIdeathonTeam = asyncHandler(async (req, res) => {

    const IdeathonTeams = await Ideathon.find().lean()

    // If no users 
    if (!IdeathonTeams?.length) {
        return res.status(400).json({ message: 'No teams found' })
    }

    res.json(IdeathonTeams);

});


}
    
    
    module.exports = ideathonController;