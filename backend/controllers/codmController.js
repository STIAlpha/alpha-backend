const asyncHandler = require('express-async-handler');
const Members = require('../models/Members');
const CODMEventEntry = require('../models/codm');

class CODMController {
  // CREATE
  static registerToCODMEvent = asyncHandler(async (req, res) => {
    const {
      teamName,
      members
    } = req.body;

    if (
     !teamName ||
     !members
    ) {
      return res.status(400).json({ message: 'All fields required' });
    }

     // Check for duplicate emails in members
     const memberEmails = new Set();
     for (const member of members) {
         if (memberEmails.has(member.email)) {
             return res.status(400).json({ message: 'Duplicate emails found in team members.' });
         }
         memberEmails.add(member.email);
     }
 
     // Check if each member exists in the database
     for (const member of members) {
         const student = await Members.findOne({ student_email: member.email }).lean().exec();
         if (!student) {
             return res.status(400).json({ message: `Student with email ${member.email} not found.` });
         }
     }
 

    const duplicate = await CODMEventEntry.findOne({ teamName  }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: 'Team Name already registered.' });
    }


    const codmEntryObject = {
      teamName,
      members
        };

    try {
      const codmEntry = await CODMEventEntry.create(codmEntryObject);
      res.status(201).json({ message: 'Team has been successfully registered!' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid data received' });
    }
  });

  // READ
  static getSingleCODMTeam = asyncHandler(async (req, res) => {
    const {teamName} = req.body;

    if (!teamName) {
      return res.status(400).json({ message: 'Team name is required' });
    }

    try {
      const codmTeam = await CODMEventEntry.findOne({ teamName }).lean().exec();
      if (!codmTeam) {
        return res.status(404).json({ message: 'Team not found' });
      }
      res.json(codmTeam);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  static getCODMTeams = asyncHandler(async (req, res) => {
    try {
      const codmTeams = await CODMEventEntry.find().lean().exec();
      if (!codmTeams.length) {
        return res.status(404).json({ message: 'No teams found' });
      }
      res.json(codmTeams);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

module.exports = CODMController;