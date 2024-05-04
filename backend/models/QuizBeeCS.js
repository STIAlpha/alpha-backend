const { default: mongoose } = require("mongoose");

const CSquizBeeSchema = new mongoose.Schema({
  Name: {
      type: String,
      required: true
  },
  YearAndSection: [{
    Year: {
      type: String,
      required: true
    },
    Section: {
      type: String,
      required: true
    }
  }],
  
  STIstudentEmail: {
    type: String,
    required: true
},
})

const CSQuizBee = mongoose.model('CSQuizBee', CSquizBeeSchema);
exports.modules = CSQuizBee;