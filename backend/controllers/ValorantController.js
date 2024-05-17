const asyncHandler = require('express-async-handler');
const Valorant = require('../models/Valorant');

class ValorantController {
    // CREATE
    static registerToValorantEvent = asyncHandler(async (req, res) => {
        const { teamName, membersNames,membersCourses,membersEmails,membersIGN,membersDC,coachname } = req.body;


        if (!teamName || !membersNames|| !membersCourses|| !membersEmails||!membersIGN|| !membersDC) {
            return res.status(400).json({ message: 'All fields except Coach Name are required.' });
        }

        const membersNamesArray = membersNames.split(',').map(name => name.trim());
        const membersCoursesArray = membersCourses.split(',').map(course => course.trim());
        const membersEmailsArray = membersEmails.split(',').map(emails => emails.trim());
        const membersIGNArray = membersIGN.split(',').map(ign => ign.trim());
        const membersDCsArray = membersDC.split(',').map(dc => dc.trim());
      
        if (membersNamesArray.length !== membersCoursesArray.length) {
          return res.status(400).json({ message: 'Members names and courses must have the same number of entries.' });
        }
        if (membersNamesArray.length !== membersEmailsArray.length) {
          return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
        }
        if (membersNamesArray.length !== membersIGNArray.length) {
          return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
        }
        if (membersNamesArray.length !== membersDCsArray.length) {
          return res.status(400).json({ message: 'Members names and emails must have the same number of entries.' });
        }
      
        //map each string to respective data
        const members = membersNamesArray.map((name, index) => ({
          name,
          coursesAndSections: membersCoursesArray[index],
          email: membersEmailsArray[index],
          ign:membersIGNArray[index],
          discordusername:membersDCsArray[index]
        }));
      
    
        const memberEmails = new Set();
        for (const member of members) {
            if (memberEmails.has(member.email)) {
                return res.status(400).json({ message: 'Duplicate emails found in team members.' });
            }
            memberEmails.add(member.email);
        }
        
        const valoteam = await Valorant.findOne({ teamName }).lean().exec();
        if (valoteam) {
            return res.status(404).json({ message: 'Team already registered' });
        }

        
        // Create and store new Valorant entry
        const valorantEntryObject = {
            teamName,
            members,
            coachname
        };

        const valorantEntry = await Valorant.create(valorantEntryObject);

        if (valorantEntry) {
            return res.status(201).json({ message: 'Team has been successfully registered!' });
        } else {
            return res.status(400).json({ message: 'Invalid data received.' });
        }
    });

    // READ ALL
    static getValorantTeams = asyncHandler(async (req, res) => {
        const valorantTeams = await Valorant.find().lean();

        if (!valorantTeams?.length) {
            return res.status(400).json({ message: 'No teams found.' });
        }

        res.json(valorantTeams);
    });

    // READ SINGLE
    static getSingleValorantTeam = asyncHandler(async (req, res) => {
        const {teamName} = req.body;

        if (!teamName) {
            return res.status(400).json({ message: 'Team name is required.' });
        }

        const valorantTeam = await Valorant.findOne({ teamName }).lean().exec();

        if (!valorantTeam) {
            return res.status(404).json({ message: 'No team found.' });
        }

        res.json(valorantTeam);
    });
}

module.exports = ValorantController;
