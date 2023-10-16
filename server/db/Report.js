const mongoose = require('mongoose');
const { string } = require('prop-types');
const markedAreaSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    name: String,
    radius: Number,
});

const reportSchema = new mongoose.Schema({
    reporterName: {
      type: String,
      required: true, 
    },
    injuryDate: {
      type: String,
      required: true,
    },
    injuryTime: {
      type: String,
      required: true,
    },
    markedAreas: [markedAreaSchema], 
  });


module.exports = mongoose.model("report", reportSchema);
