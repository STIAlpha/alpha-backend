const Members = require('../models/Members');
const Chibby = require('../models/Chibby');

class ChibbyController {
  static async registerToChibbyEvent(req, res) {
    const { studentName, yearAndSection, mobileNumber, studentEmail } = req.body;

    if (!studentName ||!yearAndSection ||!studentEmail ||!mobileNumber) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const validStudentEmail = await Members.findOne({ studentEmail }).lean().exec();

    if (!validStudentEmail) {
      return res.status(400).json({ message: 'Not a valid student email' });
    }

    const duplicate = await Chibby.findOne({ studentEmail }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: 'Student already registered.' });
    }

    const chibbyEntryObject = { studentName, yearAndSection, mobileNumber, studentEmail };
    const chibbyEntry = await Chibby.create(chibbyEntryObject);

    if (chibbyEntry) {
      return res.status(201).json({ message: 'Student has been successfully registered!' });
    } else {
      return res.status(400).json({ message: 'Invalid data received' });
    }
  }

  static async getChibbyEntries(req, res) {
    const chibbyEntries = await Chibby.find().lean();
    if (!chibbyEntries.length) {
      return res.status(404).json({ message: 'No entries found' });
    }
    res.json(chibbyEntries);
  }

  static async getChibbyEntryByName(req, res) {
    const studentName = req.params.studentName;

    if (!studentName) {
      return res.status(400).json({ message: 'Enter a student name.' });
    }

    const student = await Chibby.findOne({ studentName }).lean().exec();
    if (!student) {
      return res.status(404).json({ message: 'No entry found' });
    }
    res.json(student);
  }
}

module.exports = ChibbyController;