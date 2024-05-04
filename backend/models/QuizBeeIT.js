const mongoose = require('mongoose');

const ITquizBeeSchema = new mongoose.Schema({
  Name: {
      type: String,
      required: true
  },
  YearAndSection: {

      type: String,
      required: true
    
  },
  STIstudentEmail: {
    type: String,
    required: true
},
})

const ITQuizBee = mongoose.model('ITQuizBee', ITquizBeeSchema);
module.exports =ITQuizBee;