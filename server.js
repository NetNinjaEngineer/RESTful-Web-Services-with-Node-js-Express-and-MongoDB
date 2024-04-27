const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const students = [
  { id: 100, firstName: "Mohamed", lastName: "Ehab", department: "CS" },
  { id: 101, firstName: "Ali", lastName: "Ibrahi,", department: "OR" },
  { id: 102, firstName: "Ali", lastName: "Mohamed", department: "IT" },
  { id: 103, firstName: "Osana", lastName: "Wael", department: "IS" },
  { id: 104, firstName: "Sayed", lastName: "Samy", department: "CS" },
];

app.get('/', (req, res) => {
  res.send("Hello Mohamed ")
})


// request to get all students
app.get('/api/students', (req, res) => {
  res.json(students)
})

// request to get specific student

app.get('/api/students/:id', (req, res) => {
  let studentId = parseInt(req.params.id);
  let student = students.find((value, index, obj) => { return value.id === studentId });
  res.json(student)

})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})