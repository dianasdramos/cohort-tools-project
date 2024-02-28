const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors")

const app = express();
/* Configure Express Server to Handle JSON Files */
app.use(express.json());

/* Decode what can be sent via the web */
app.use(express.urlencoded({extended:false}));

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

const Cohort = require("./models/Cohort.model.js");

const Student = require("./models/Students.model.js");

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
  Cohort.create({
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
  Cohort.find()
  .then((allCohorts) => {
    res.status(200).json(allCohorts);
    })
  .catch((error) => {
    console.log(error);
    res.status(500).json({error: "Failed to get all cohorts"});
  });
});

//RETRIEVE A SPECIFIC COHORT BY ID

app.get("/api/cohorts/:cohortId", (req, res) => {

  Cohort.findById(req.params.cohortId) 
  .then((cohortIdFind) => {
      res.status(200).json(cohortIdFind)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to get a cohort by ID" })
    })
})

//UPDATE A SPECIFIC COHORT BY ID

app.put("/api/cohorts/:cohortId", (req, res) => {

  Cohort.findById(req.params.cohortId)
    .then((cohortIdUpdate) => {
      res.status(200).json(cohortIdUpdate)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update a cohort by ID" })
    })
})

//DELETE A SPECIFIC COHORT BY ID

app.delete("/api/cohorts/:cohortId", (req, res) => {

  Cohort.findById(req.params.cohortId)
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
  Student.create({
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
  Student.find()
  .then((allStudents) => {
    res.status(200).json(allStudents);
    })
  .catch((error) => {
    res.status(500).json({error: "Failed to get all students"});
  });
});

//RETRIEVE ALL STUDENTS FROM A SPECIFIC COHORT

app.get("/api/students/cohort/:cohortId", (req, res) => {

  Student.findById(req.params.cohortId)
  .populate("cohort")
    .then((studentByCohortId) => {
      res.status(200).json(studentByCohortId)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to get students by cohort" })
    })
})

//RETRIEVE A SPECIFIC STUDENT BY ID

app.get("/api/students/:studentId", (req, res) => {

  Student.findById(req.params.studentId)
  .populate("cohort")
    .then((studentIdFind) => {
      res.status(200).json(studentIdFind)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to get a student by ID" })
    })
})

//UPDATE A SPECIFIC STUDENT BY ID

app.put("/api/students/:studentId", (req, res) => {

  Student.findById(req.params.studentId)
    .then((studentIdUpdate) => {
      res.status(200).json(studentIdUpdate)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update a student by ID" })
    })
})

//DELETE A SPECIFIC STUDENT BY ID

app.delete("/api/students/:studentId", (req, res) => {

  Student.findById(req.params.studentId)
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