const mongoose = require('mongoose')

const Student= new mongoose.Schema({
  name: { type: String, required: true },
  coursesAndSections: { type: String, required: true },

});

const CSquizBeeSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  members: {type:[Student],required:true},
  representativeEmail: { type: String }

})




const CSQuizBee = mongoose.model('CSQuizBee', CSquizBeeSchema);
module.exports = CSQuizBee;