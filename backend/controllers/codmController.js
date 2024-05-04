const asyncHandler = require('express-async-handler');
const Members = require('../models/Members');
const CODMEventEntry = require('../models/CODMEventEntry');

class CODMController {
    // CREATE
    static registerToCODMEvent = asyncHandler(async (req, res) => {
        const { teamName, memberNames, coursesAndSections, email, mobileNumber, igns, playerIds, currentRanks, agreement } = req.body;

        if (!teamName || !memberNames || !coursesAndSections || !email || !mobileNumber || !igns || !playerIds || !currentRanks || agreement === undefined) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const validEmail = await Members.findOne({ email }).lean().exec();

        if (!validEmail) {
            return res.status(400).json({ message: 'Not a valid email' });
        }

        const duplicate = await CODMEventEntry.findOne({ email }).lean().exec();

        if (duplicate) {
            return res.status(409).json({ message: 'Team already registered.' });
        }

        const codmEntryObject = {
            teamName,
            memberNames,
            coursesAndSections,
            email,
            mobileNumber,
            igns,
            playerIds,
            currentRanks,
            agreement
        };

        const codmEntry = await CODMEventEntry.create(codmEntryObject);

        if (codmEntry) {
            return res.status(200).json({ message: 'Team has been successfully registered!' });
        } else {
            return res.status(400).json({ message: 'Invalid data received' });
        }
    });

    // READ
    static getSingleCODMTeam = asyncHandler(async (req, res) => {
        const teamName = req.params.teamName;

        if (!teamName) {
            return res.status(400).json({ message: 'Team name is required' });
        }

        const codmTeam = await CODMEventEntry.findOne({ teamName }).lean().exec();

        if (!codmTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.json(codmTeam);
    });

    static getCODMTeams = asyncHandler(async (req, res) => {
        const codmTeams = await CODMEventEntry.find().lean().exec();

        if (!codmTeams?.length) {
            return res.status(404).json({ message: 'No teams found' });
        }

        res.json(codmTeams);
    });
}

module.exports = CODMController;
