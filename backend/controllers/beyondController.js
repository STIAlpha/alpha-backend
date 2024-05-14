const Members = require('../models/Members');
const Beyond = require('../models/Beyond');

class BeyondController {
  // CREATE
  static async registerToBeyondEvent(req, res) {
    const { teamName, membersNames, membersCourses, representativeEmail, representativeNum } = req.body;
  
    if (!teamName || !membersNames || !membersCourses || !representativeEmail || !representativeNum) {
      return res.status(400).json({ message: 'All fields required' });
    }
  
    const membersNamesArray = membersNames.split(',').map(name => name.trim());
    const membersCoursesArray = membersCourses.split(',').map(course => course.trim());
  
    if (membersNamesArray.length !== membersCoursesArray.length) {
      return res.status(400).json({ message: 'Members names and courses must have the same number of entries.' });
    }
  
    const members = membersNamesArray.map((name, index) => ({
      name,
      coursesAndSections: membersCoursesArray[index],
      email: representativeEmail 
    }));
  
    for (const member of members) {
      if (!member.name || !member.coursesAndSections) {
        return res.status(400).json({ message: 'All member fields required' });
      }
    }
  
    const memberEmails = new Set();
    for (const member of members) {
      if (memberEmails.has(member.email)) {
        return res.status(400).json({ message: 'Duplicate emails found in team members.' });
      }
      memberEmails.add(member.email);
    }
  
    for (const member of members) {
      const student = await Members.findOne({ student_email: member.email }).lean().exec();
      if (!student) {
        return res.status(400).json({ message: `Student with email ${member.email} not found.` });
      }
    }
  
    const duplicate = await Beyond.findOne({ teamName }).lean().exec();
    if (duplicate) {
      return res.status(409).json({ message: 'Team already registered.' });
    }
  
    const beyondEntryObject = {
      teamName,
      members
    };
  
    try {
      const beyondEntry = await Beyond.create(beyondEntryObject);
      res.status(201).json({ message: 'Team has been successfully registered!' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid data received' });
    }
  }

  static async getSingleBeyondTeam(req, res) {
    const {teamName} = req.body;

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