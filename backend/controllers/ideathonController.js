const Members = require('../models/Members');
const Ideathon = require('../models/Ideathon');

class IdeathonController {
  /**
   * Register a team to the Ideathon event
   */
  static async registerToIdeathonEvent(req, res) {
    const { teamName, members, teamRepresentativeEmailAddress } = req.body;

    if (!teamName ||!members ||!teamRepresentativeEmailAddress) {
      return res.status(400).json({ message: 'All fields are required' });
    }

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


    const validTeam= await Ideathon.findOne({ teamName }).lean().exec();

    if (validTeam) {
      return res.status(400).json({ message: 'Not a valid team name' });
    }

    const duplicate = await Members.findOne({student_email: teamRepresentativeEmailAddress }).lean().exec();

    if (!duplicate) {
      return res.status(409).json({ message: 'Email not registered.' });
    }

    const ideathonEntryObject = {
      teamName,
      members,
      teamRepresentativeEmailAddress
    };

    try {
      const ideathonEntry = await Ideathon.create(ideathonEntryObject);
      return res.status(201).json({ message: 'Team has been successfully registered!' });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid data received' });
    }
  }

  /**
   * Get a single Ideathon team
   */
  static async getSingleIdeathonTeam(req, res) {
    const {teamName} = req.body;

    if (!teamName) {
      return res.status(400).json({ message: 'Team name is required' });
    }

    try {
      const ideathonTeam = await Ideathon.findOne({ teamName }).lean().exec();
      if (!ideathonTeam) {
        return res.status(404).json({ message: 'No team found' });
      }
      return res.json(ideathonTeam);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * Get all Ideathon teams
   */
  static async getIdeathonTeams(req, res) {
    try {
      const ideathonTeams = await Ideathon.find().lean().exec();
      if (!ideathonTeams.length) {
        return res.status(404).json({ message: 'No teams found' });
      }
      return res.json(ideathonTeams);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = IdeathonController;