const mongoose = require('mongoose');

const Student= new mongoose.Schema({
    name: { type: String, required: true },
    coursesAndSections: { type: String, required: true },
  
  });
const ITquizBeeSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    members: {type:[Student],required:true},
    representativeEmail: { type: String }
})

const ITQuizBee = mongoose.model('ITQuizBee', ITquizBeeSchema);
module.exports =ITQuizBee;