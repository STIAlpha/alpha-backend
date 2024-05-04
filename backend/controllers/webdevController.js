const asyncHandler = require('express-async-handler');
const WebDevEntry = require('../models/webdev');

class WebDevController {
    // CREATE
    static registerToWebDevEvent = asyncHandler(async (req, res) => {
        const { teamName, members, teamRepEmail } = req.body;

        if (!teamName || !members || !teamRepEmail) {
            return res.status(400).json({ message: 'All fields required' });
        }
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
