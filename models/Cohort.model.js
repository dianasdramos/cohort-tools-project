const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const date = newDate();


  const cohortSchema = new Schema({
    cohortSlug: String,
    cohortName: String,
    program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
    format: {type: String, enum: ["Full Time", "Part Time"]},
    campus: {type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},
    startDate: date,

  })

  