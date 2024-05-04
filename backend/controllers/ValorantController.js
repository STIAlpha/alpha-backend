const asyncHandler = require('express-async-handler');
const Valorant = require('../models/Valorant');

class ValorantController {
    // CREATE
    static registerToValorantEvent = asyncHandler(async (req, res) => {
        const { teamName, fullNamesOfPlayers, programAndSection, stiEmailAddresses, discordUsernames, valorantIGNsAndTaglines, coachName } = req.body;

        if (!teamName || !fullNamesOfPlayers || !programAndSection || !stiEmailAddresses || !discordUsernames || !valorantIGNsAndTaglines) {
            return res.status(400).json({ message: 'All fields except Coach Name are required.' });
        }

        // Create and store new Valorant entry
        const valorantEntryObject = {
            teamName,
            fullNamesOfPlayers,
            programAndSection,
            stiEmailAddresses,
            discordUsernames,
            valorantIGNsAndTaglines,
            coachName,
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
        const teamName = req.params.teamName;

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
