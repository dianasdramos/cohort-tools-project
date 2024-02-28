const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//const date = newDate();

const finalDate = "endDate"

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    linkedinUrl: { type: String, default: "" },
    languages: { type: [String], enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"] },
    program: { type: [String], enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity", "Portuguese", "Dutch", "Other"] },
    background: { type: String, default: "" },
    image: { type: Image, default: "https://i.imgur.com/r8bo8u7.png" },
    cohort: "ObjectId",
    leadTeacher: String,
    projects: Array
})

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;