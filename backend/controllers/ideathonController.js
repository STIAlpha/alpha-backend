const Members = require('../models/Members');
const Ideathon = require('../models/Ideathon');

class IdeathonController {
  /**
   * Register a team to the Ideathon event
   */
  static async registerToIdeathonEvent(req, res) {
    const { teamName, memberNames, memberYearSections, teamRepresentativeEmailAddress } = req.body;

    if (!teamName ||!memberNames ||!memberYearSections ||!teamRepresentativeEmailAddress) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (memberNames.length!== 5) {
      return res.status(400).json({ message: 'A team must have exactly 5 members' });
    }

    const validTeamRepresentativeEmailAddress = await Members.findOne({ student_email: teamRepresentativeEmailAddress }).lean().exec();

    if (!validTeamRepresentativeEmailAddress) {
      return res.status(400).json({ message: 'Not a valid team representative email address' });
    }

    const duplicate = await Ideathon.findOne({ teamRepresentativeEmailAddress }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const ideathonEntryObject = {
      teamName,
      teamRepresentativeEmailAddress,
      members: memberNames.map((memberName, index) => ({
        name: memberName,
        yearAndSection: memberYearSections[index],
      })),
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
    const teamName = req.params.teamName;

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