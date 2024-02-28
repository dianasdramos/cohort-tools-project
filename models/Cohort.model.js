const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//const date = newDate();

const finalDate = "endDate"

const cohortSchema = new Schema({
  cohortSlug: String,
  cohortName: String,
  program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"] },
  format: { type: String, enum: ["Full Time", "Part Time"] },
  campus: { type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"] },
  startDate: { type: Date, default: Date.now },
  endDate: finalDate,
  inProgress: { type: Boolean, default: false },
  programManager: String,
  leadTeacher: String,
  totalHours: { type: Number, default: 360 }
})

const Cohort = mongoose.model("Cohort", cohortSchema);

 
module.exports = Cohort;