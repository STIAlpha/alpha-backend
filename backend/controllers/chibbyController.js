const  Members  = require('../models/Members');
const  Chibby  = require('../models/Chibby');

class ChibbyController {
  static async registerToChibbyEvent(req, res) {
    const { studentName, yearAndSection, mobileNumber, studentEmail } = req.body;

    if (!studentName ||!yearAndSection ||!studentEmail ||!mobileNumber) {
      return res.status(400).json({ message: 'All fields required' });
    }

    try {
      const validStudentEmail = await Members.findOne({ student_email: studentEmail.toLowerCase() }).lean().exec();

      if (!validStudentEmail) {
        return res.status(400).json({ message: 'Not a valid student email' });
      }

      const duplicate = await Chibby.findOne({ studentEmail: studentEmail.toLowerCase() }).lean().exec();

      if (duplicate) {
        return res.status(409).json({ message: 'Student already registered.' });
      }

      const chibbyEntryObject = { studentName, yearAndSection, mobileNumber, studentEmail: studentEmail.toLowerCase() };
      const chibbyEntry = await Chibby.create(chibbyEntryObject);

      if (chibbyEntry) {
        return res.status(201).json({ message: 'Student has been successfully registered!' });
      } else {
        return res.status(400).json({ message: 'Invalid data received' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getChibbyEntries(req, res) {
    try {
      const chibbyEntries = await Chibby.find().lean();
      if (!chibbyEntries.length) {
        return res.status(404).json({ message: 'No entries found' });
      }
      res.json(chibbyEntries);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getChibbyEntryByName(req, res) {
    const {studentName} = req.body;

    if (!studentName) {
      return res.status(400).json({ message: 'Enter a student name.' });
    }

    try {
      const student = await Chibby.findOne({ studentName }).lean().exec();
      if (!student) {
        return res.status(404).json({ message: 'No entry found' });
      }
      res.json(student);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = ChibbyController;