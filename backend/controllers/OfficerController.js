const asyncHandler = require('express-async-handler')
const exceljs = require('exceljs')
const fs = require('fs')
const path = require('path')
const Officer = require('../models/officer');

class OfficerController {
    // CREATEstatic 
  static addOfficersList = asyncHandler(async (req, res) => {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(file.buffer);

    const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first worksheet

    const officersData = [];

    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex > 1) { // Skip header row
        const name = row.getCell(2).value; // Assuming name is in the second column (B)
        const department = row.getCell(3).value; // Assuming department is in the third column (C)
        const position = row.getCell(4).value; // Assuming section is in the fourth column (D)
        const section = row.getCell(5).value; // Assuming section is in the fourth column (D)
        const bio2 = row.getCell(6).value; // Assuming bio is in the fifth column (E)
        let githubLink = null;
        let fbLink = null;
        const email = row.getCell(9).value; // Assuming email is in the eighth column (H)
    
        // Extract GitHub link
        const githubCell = row.getCell(7);
        if (githubCell && githubCell.text) {
          githubLink = githubCell.text.trim(); // Extract and trim GitHub link
        }
    
        // Extract Facebook link
        const fbCell = row.getCell(8);
        if (fbCell && fbCell.text) {
          fbLink = fbCell.text.trim(); // Extract and trim Facebook link
        }
    
        if (name) {
          officersData.push({
            name: name,
            department: department || null,
            section: section || null,
            image: null, // Assuming image is not provided in the file
            bio: bio2, // Assuming bio is in the fifth column (E)
            githubLink: githubLink || null,
            fbLink: fbLink || null,
            email: email || null
          });
        }
      }
    });
    try {
      // Insert data into MongoDB
      await Officer.create(officersData);
      res.status(200).json({ message: 'Officers added successfully' });
    } catch (error) {
      console.error('Error importing officers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}
    
    
    module.exports = OfficerController;
