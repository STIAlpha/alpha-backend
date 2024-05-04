const { default: mongoose } = require("mongoose");

const ITquizBeeSchema = new mongoose.Schema({
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

const ITQuizBee = mongoose.model('ITQuizBee', ITquizBeeSchema);
exports.modules = ITQuizBee;