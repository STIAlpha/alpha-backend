const asyncHandler = require('express-async-handler');
const WebDevEntry = require('../models/webdev');

class WebDevController {
    // CREATE
static registerToWebDevEvent = asyncHandler(async (req, res) => {
    const { teamName, membersNames,membersCourses,membersgithubProfiles, teamRepEmail } = req.body;



    if (!teamName || !membersNames||!membersCourses||!membersgithubProfiles||! teamRepEmail ) {
        return res.status(400).json({ message: 'All fields required' });
    }

    const membersNamesArray = membersNames.split(',').map(name => name.trim());
    const membersCoursesArray = membersCourses.split(',').map(course => course.trim());
    const membersgithubArray = membersgithubProfiles.split(',').map(course => course.trim());
  
    if (membersNamesArray.length !== membersCoursesArray.length) {
        return res.status(400).json({ message: 'Members names and courses must have the same number of entries.' });
      }
      if (membersNamesArray.length !== membersgithubArray.length) {
        return res.status(400).json({ message: 'Members names and courses must have the same number of entries.' });
      }
    
    //map each string to respective data
    const members = membersNamesArray.map((name, index) => ({
      name,
      coursesAndSections: membersCoursesArray[index],
      githubProfiles:membersgithubArray[index]
    })); 


        const webDevTeam = await WebDevEntry.findOne({ teamName }).lean().exec();

        if (webDevTeam) {
            return res.status(404).json({ message: 'Team already registered' });
        }



        const webDevEntryObject = {
            teamName,
            members,
            teamRepEmail 
        };
    
        const webDevEntry = await WebDevEntry.create(webDevEntryObject);

        if (webDevEntry) {
            return res.status(200).json({ message: 'Team has been successfully registered!' });
        } else {
            return res.status(400).json({ message: 'Invalid data received' });
        }
    });

    // READ
    static getSingleWebDevTeam = asyncHandler(async (req, res) => {
        const {teamName} = req.body;

        if (!teamName) {
            return res.status(400).json({ message: 'Team name is required' });
        }

        const webDevTeam = await WebDevEntry.findOne({ teamName }).lean().exec();

        if (!webDevTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.json(webDevTeam);
    });

    static getWebDevTeams = asyncHandler(async (req, res) => {
        const webDevTeams = await WebDevEntry.find().lean().exec();

        if (!webDevTeams?.length) {
            return res.status(404).json({ message: 'No teams found' });
        }

        res.json(webDevTeams);
    });
}

module.exports = WebDevController;
