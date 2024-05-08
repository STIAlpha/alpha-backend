const asyncHandler = require('express-async-handler')
const exceljs = require('exceljs')
const fs = require('fs')
const path = require('path')
const Officer = require('../models/officer');

class OfficerController {
    // CREATE
    static addOfficersList = asyncHandler(async (req, res) => {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(file.buffer);

    const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first worksheet


    const names = [];
    const programs = [];
    const interests = [];
    const numbers = [];
    const emails = [];
    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex > 1) { // Skip header row
        const name = row.getCell(7).value; // Assuming email is in the fourth column (D)
        const program = row.getCell(8).value; // Assuming email is in the fourth column (D)
        const interest = row.getCell(10).value; // Assuming email is in the fourth column (D)
        const number = row.getCell(11).value; // Assuming email is in the fourth column (D)
        const email = row.getCell(4).value; // Assuming email is in the fourth column (D)
        if (name) {
          names.push(name);
        }
        if (program) {
          programs.push(program);
        }
        if (interest) {
          interests.push(interest);
        }
        if (number) {
          numbers.push(number);
        }
        if (email) {
          emails.push(email);
        }
        
      }
    });

    try {
      // Map emails to an array of objects with the correct schema field
      const officersData = names.map((name, index) => ({
        name: name,
        program: programs[index] || null, // Use index to access corresponding program
        interest: interests[index] || null, // Use index to access corresponding interest
        number: numbers[index] || null, // Use index to access corresponding number
        student_email: emails[index] // No need for a ternary operator here
    }));

    // Insert data into MongoDB
    await Officer.create(officersData);
      res.status(200).json({ message: 'Emails added successfully' });
    } catch (error) {
      console.error('Error importing emails:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}
    
    
    module.exports = OfficerController;
