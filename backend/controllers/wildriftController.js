const asyncHandler = require('express-async-handler')
const exceljs = require('exceljs')
const fs = require('fs')
const path = require('path')
const Members = require('../models/Members');
const Wildrift = require('../models/Wildrift');

class WildriftController {
    // CREATE
    static registerToWildriftEvent = asyncHandler(async (req, res) => {
    const { teamName, participants, studentEmail } = req.body;

    if (!teamName || !Array.isArray(participants) || !participants.length || !studentEmail ) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validStudentEmail = await Members.findOne({studentEmail}).lean().exec()

    if(!validStudentEmail) {
        
        return res.status(400).json({message: 'Not a valid student email'})
    }

    const duplicate = await Wildrift.findOne({ studentEmail }).lean().exec();

    if(duplicate) {
        return res.status(409).json({message: 'Team already registered.'});
    }

    const validatedParticipants = participants.map((participant) => {
        // Perform validation on each participant object if needed
        // (e.g., ensure required fields are present)
        return participant;
      });

      if (validatedParticipants.length !== 5) {
        return res.status(400).json({ message: 'A team must have exactly 5 members' });
      }

      const wildriftEntryObject = {
        teamName,
        studentEmail,
        participants: validatedParticipants, // Include validated participants array
      };

     // Create and store new chess entry
     const wildriftEntry = await Wildrift.create(wildriftEntryObject)

     if(wildriftEntry) {
        return res.status(200).json({message: 'Team has been successfully registered!'})
     }else {
        return res.status(400).json({message: 'Invalid data received'})
     }   
  });

  static getSingleWildriftTeam = asyncHandler(async (req, res) => {

    const teamName = req.params.teamName;

    if(!teamName) {
        return res.status(400).json({message: '.'});
    }

    const wildriftTeam = await Wildrift.findOne({teamName}).lean().exec()

    if(!wildriftTeam) {
        return res.status(400).json({message: 'No team found'})
    }
    res.json(wildriftTeam)


})

static getWildriftTeam = asyncHandler(async (req, res) => {

    const wildriftTeams = await Wildrift.find().lean()

    // If no users 
    if (!wildriftTeams?.length) {
        return res.status(400).json({ message: 'No teams found' })
    }

    res.json(wildriftTeams);

});


}
    
    
    module.exports = WildriftController;
