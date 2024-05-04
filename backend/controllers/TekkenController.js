const asyncHandler = require('express-async-handler');
const Tekken = require('../models/Tekken');

class TekkenController {
    // CREATE
    static registerToTekkenEvent = asyncHandler(async (req, res) => {
        const { fullName, yearAndSection, stiEmailAddress, discordUsername } = req.body;

        if (!fullName || !yearAndSection || !stiEmailAddress || !discordUsername) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create and store new Tekken entry
        const tekkenEntryObject = {
            fullName,
            yearAndSection,
            stiEmailAddress,
            discordUsername
        };

        const tekkenEntry = await Tekken.create(tekkenEntryObject);

        if (tekkenEntry) {
            return res.status(201).json({ message: 'Entry has been successfully registered!' });
        } else {
            return res.status(400).json({ message: 'Invalid data received.' });
        }
    });

    // READ ALL
    static getTekkenEntries = asyncHandler(async (req, res) => {
        const tekkenEntries = await Tekken.find().lean();

        if (!tekkenEntries?.length) {
            return res.status(400).json({ message: 'No entries found.' });
        }

        res.json(tekkenEntries);
    });

    // READ SINGLE
    static getSingleTekkenEntry = asyncHandler(async (req, res) => {
        const fullName = req.params.fullName;

        if (!fullName) {
            return res.status(400).json({ message: 'Full name is required.' });
        }

        const tekkenEntry = await Tekken.findOne({ fullName }).lean().exec();

        if (!tekkenEntry) {
            return res.status(404).json({ message: 'No entry found.' });
        }

        res.json(tekkenEntry);
    });
}

module.exports = TekkenController;
