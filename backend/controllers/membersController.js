const asyncHandler = require('express-async-handler')
const exceljs = require('exceljs')
const fs = require('fs')
const path = require('path')
const Members = require('../models/Members');

class MembersController {
    // CREATE
    static addMembersList = asyncHandler(async (req, res) => {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(file.buffer);

    const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first worksheet

    const emails = [];
    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex > 1) { // Skip header row
        const email = row.getCell(4).value; // Assuming email is in the fourth column (D)
        if (email) {
          emails.push(email);
        }
      }
    });

    try {
      // Map emails to an array of objects with the correct schema field
      const mappedEmails = emails.map(email => ({ student_email: email }));

      // Insert emails into MongoDB
      await Members.create(mappedEmails); // Use await here
      res.status(200).json({ message: 'Emails added successfully' });
    } catch (error) {
      console.error('Error importing emails:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}
    
    
    module.exports = MembersController;
