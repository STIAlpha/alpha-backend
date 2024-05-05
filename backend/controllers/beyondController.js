const Members = require('../models/Members');
const Beyond = require('../models/Beyond');

class BeyondController {
  // CREATE
  static async registerToBeyondEvent(req, res) {
    const { teamName, members, studentEmail } = req.body;
  
    if (!teamName ||!Array.isArray(members) || members.length < 4 ||!studentEmail) {
      return res.status(400).json({ message: 'All fields required' });
    }
  
    for (const member of members) {
      if (!member.name ||!member.yearAndSection) {
        return res.status(400).json({ message: 'All member fields required' });
      }
    }
  
    const validStudentEmail = await Members.findOne({ student_email: studentEmail.toLowerCase() }).lean().exec();
  
    if (!validStudentEmail) {
      return res.status(400).json({ message: 'Not a valid student email' });
    }
  
    const duplicate = await Beyond.findOne({ studentEmail }).lean().exec();
  
    if (duplicate) {
      return res.status(409).json({ message: 'Team already registered.' });
    }
  
    const beyondEntryObject = {
      teamName,
      studentEmail: studentEmail.toLowerCase(), 
      members,
    };
  
    try {
      const beyondEntry = await Beyond.create(beyondEntryObject);
      res.status(201).json({ message: 'Team has been successfully registered!' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid data received' });
    }
  }

  static async getSingleBeyondTeam(req, res) {
    const teamName = req.params.teamName;

    if (!teamName) {
      return res.status(400).json({ message: 'Team name is required' });
    }

    try {
      const beyondTeam = await Beyond.findOne({ teamName }).lean().exec();
      if (!beyondTeam) {
        return res.status(404).json({ message: 'No team found' });
      }
      res.json(beyondTeam);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getBeyondTeams(req, res) {
    try {
      const beyondTeams = await Beyond.find().lean();
      if (!beyondTeams.length) {
        return res.status(404).json({ message: 'No teams found' });
      }
      res.json(beyondTeams);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = BeyondController;