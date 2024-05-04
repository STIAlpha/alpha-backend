const asyncHandler = require('express-async-handler')
const exceljs = require('exceljs')
const fs = require('fs')
const path = require('path')
const Members = require('../models/Members');
const ResearchForum = require('../models/ResearchForum');

class researchForumController {
    // CREATE
    static registerToResearchForumEvent = asyncHandler(async (req, res) => {
    const { nameSchool, accompanyingAdviserName, studentParticipants, mobileNumberAdvisor, adviserEmail, titleResearch } = req.body;

    if (!nameSchool || !accompanyingAdviserName ||!Array.isArray(studentParticipants) || !studentParticipants.length || !mobileNumberAdvisor || !adviserEmail || !titleResearch) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validAdviserEmail = await Members.findOne({adviserEmail}).lean().exec()  //changes to be made to validate adviser email not students from schema

    if(!validAdviserEmail) {
        
        return res.status(400).json({message: 'Not a valid adviser email'})
    }

    const duplicate = await ResearchForum.findOne({ adviserEmail }).lean().exec();

    if(duplicate) {
        return res.status(409).json({message: 'Email already registered.'});
    }

    const validatedStudentParticipants = studentParticipants.map((studentParticipants) => {
        // Perform validation on each participant object if needed
        // (e.g., ensure required fields are present)
        return studentParticipants;
      });

      if (validatedstudentParticipants.length < 1) {
        return res.status(400).json({ message: 'A team must have more than 1 members' });
      }

      const researchForumEntryObject = {
        titleResearch,
        adviserEmail,
        studentParticipants: validatedStudentParticipants, // Include validated participants array
      };

     // Create and store research entry
     const ResearchForumEntry = await Wildrift.create(researchForumEntryObject)

     if(ResearchForumEntry) {
        return res.status(200).json({message: 'Research Team has been successfully registered!'})
     }else {
        return res.status(400).json({message: 'Invalid data received'})
     }   
  });

  static getSingleResearchForumTeam = asyncHandler(async (req, res) => {

    const studentParticipants = req.params.studentParticipants;

    if(!studentParticipants) {
        return res.status(400).json({message: '.'});
    }

    const ResearchForumTeam = await Wildrift.findOne({studentParticipants}).lean().exec()

    if(!ResearchForumTeam) {
        return res.status(400).json({message: 'No team found'})
    }
    res.json(ResearchForumTeam)


})

static getResearchForumTeam = asyncHandler(async (req, res) => {

    const ResearchForumTeams = await ResearchForum.find().lean()

    // If no users 
    if (!ResearchForumTeams?.length) {
        return res.status(400).json({ message: 'No teams found' })
    }

    res.json(ResearchForumTeams);

});


}
    
    
    module.exports = researchForumController;