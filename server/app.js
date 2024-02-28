const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors")

const app = express();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

const cohorts = require("./cohorts.json");

const students = require("./students.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(origin = ['http://localhost:5005/api/cohorts', 'http://example.com'],
  ['http://localhost:5005/docs'],
  ['http://localhost:5005/api/cohorts'])); //define every route

//sapp.use(logger("dev"));
app.use(express.static('public'));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//////////////////////////////////////////
//---------- COHORT ROUTES ------------//
////////////////////////////////////////



//CREATE NEW COHORT

app.post("/api/cohorts", (req, res) => {
  cohorts.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortSlug,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then((createdCohorts) => {
      console.log("Cohort created ->", createdCohorts);
      res.status(201).json(createdCohorts);
    })
    .catch((error) => {
      console.error("Error while creating the cohort ->", error);
      res.status(500).json({ error: "Failed to create the cohort" });
    });
});

//RETRIEVE ALL COHORT DATA

app.get("/api/cohorts", (req, res) => {
  console.log(cohorts);
  res.status(200).json(cohorts);
});

//RETRIEVE A SPECIFIC COHORT BY ID

app.get("/api/cohorts/:cohortId", (req, res) => {

  cohorts.findById(req.params.cohortId)
  .populate("cohorts")  
  .then((cohortIdFind) => {
      res.status(200).json(cohortIdFind)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to get a cohort by ID" })
    })
})

//UPDATE A SPECIFIC COHORT BY ID

app.put("/api/cohorts/:cohortId", (req, res) => {

  cohorts.findById(req.params.cohortId)
    .then((cohortIdUpdate) => {
      res.status(200).json(cohortIdUpdate)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update a cohort by ID" })
    })
})

//DELETE A SPECIFIC COHORT BY ID

app.delete("/api/cohorts/:cohortId", (req, res) => {

  cohorts.findById(req.params.cohortId)
    .then((cohortIdDelete) => {
      res.status(200).json(cohortIdDelete)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete a cohort by ID" })
    })
})

///////////////////////////////////////////
//---------- Students Routes -----------//
/////////////////////////////////////////

//CREATE NEW STUDENT

app.post("/api/students", (req, res) => {
  students.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort,
    leadTeacher: req.body.leadTeacher,
    projects: req.body.projects,
  })
    .then((createdstudents) => {
      console.log("student created ->", createdstudents);
      res.status(201).json(createdstudents);
    })
    .catch((error) => {
      console.error("Error while adding the student ->", error);
      res.status(500).json({ error: "Failed to add the student" });
    });
});

//RETRIEVE ALL STUDENT DATA

app.get("/api/students", (req, res) => {
  res.status(200).json(students);
});

//RETRIEVE ALL STUDENTS FROM A SPECIFIC COHORT

app.get("/api/students/cohort/:cohortId", (req, res) => {

  students.findById(req.params.cohortId)
  .populate("students")
    .then((studentByCohortId) => {
      res.status(200).json(studentByCohortId)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to get students by cohort" })
    })
})

//RETRIEVE A SPECIFIC STUDENT BY ID

app.get("/api/students/:studentId", (req, res) => {

  students.findById(req.params.studentId)
    .then((studentIdFind) => {
      res.status(200).json(studentIdFind)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to get a student by ID" })
    })
})

//UPDATE A SPECIFIC STUDENT BY ID

app.put("/api/students/:studentId", (req, res) => {

  students.findById(req.params.studentId)
    .then((studentIdUpdate) => {
      res.status(200).json(studentIdUpdate)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update a student by ID" })
    })
})

//DELETE A SPECIFIC STUDENT BY ID

app.delete("/api/students/:studentId", (req, res) => {

  students.findById(req.params.studentId)
    .then((studentIdDelete) => {
      res.status(200).json(studentIdDelete)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete a student by ID" })
    })
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});