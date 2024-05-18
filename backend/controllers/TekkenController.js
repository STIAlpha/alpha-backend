const asyncHandler = require('express-async-handler');
const Tekken = require('../models/Tekken');
const Members = require('../models/Members');

class TekkenController {
  // CREATE
  static registerToTekkenEvent = asyncHandler(async (req, res) => {
    const { fullName, yearAndSection, stiEmailAddress, discordUsername } = req.body;

    if (!fullName || !yearAndSection || !stiEmailAddress || !discordUsername) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const check = await Members.findOne({ student_email: stiEmailAddress }).lean().exec();
        if (!check) {
            return res.status(404).json({ message: 'No account found' });
        }
        const check2 = await Tekken.findOne({ student_email: stiEmailAddress }).lean().exec();
        if (check2) {
            return res.status(404).json({ message: 'account already registered' });
        }

    try {
      const tekkenEntry = await Tekken.create({ fullName, yearAndSection, stiEmailAddress, discordUsername });
      res.status(201).json({ message: 'Entry has been successfully registered!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // READ ALL
  static getTekkenEntries = asyncHandler(async (req, res) => {
    try {
      const tekkenEntries = await Tekken.find().lean();
      if (!tekkenEntries?.length) {
        return res.status(400).json({ message: "No entries found" });
      }
      res.json(tekkenEntries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });



  // READ SINGLE
  static getSingleTekkenEntry = asyncHandler(async (req, res) => {
    const { fullName } = req.body;

    if (!fullName) {
      return res.status(400).json({ message: 'Full name is required.' });
    }

    try {
      const tekkenEntry = await Tekken.findOne({ fullName }).lean().exec();
      if (!tekkenEntry) {
        return res.status(404).json({ message: 'No entry found.' });
      }
      res.json(tekkenEntry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

module.exports = TekkenController;