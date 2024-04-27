const express = require('express')
const path = require('path')

const app = express()

app.use(express.urlencoded({ extended: true }))


const port = process.env.PORT || 5000

const students = [
  { id: 100, firstName: "Mohamed", lastName: "Ehab", department: "CS" },
  { id: 101, firstName: "Ali", lastName: "Ibrahi,", department: "OR" },
  { id: 102, firstName: "Ali", lastName: "Mohamed", department: "IT" },
  { id: 103, firstName: "Osana", lastName: "Wael", department: "IS" },
  { id: 104, firstName: "Sayed", lastName: "Samy", department: "CS" },
];

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, "/main.html"))
})

app.get('/welcome.html', (request, response) => {
  console.log(request.query)
  response.send("Welcome Dear Guest")

})

app.post('/welcome.html', (request, response) => {
  console.log(request.query)
  console.log(request.body)

  response.send(`Thanks ${request.body.fname} ${request.body.lname} for Submiting form data...`)
})


// request to get all students
app.get('/api/students', (req, res) => {
  res.json(students)
})

// request to get specific student

app.get('/api/students/:id', (req, res) => {
  let studentId = parseInt(req.params.id);
  // let student = students.find((value, index, obj) => { return value.id === studentId });
  let filteredStudent = students.find(student => student.id === studentId);

  if (filteredStudent != null) {
    res.json(filteredStudent)
  } else
    res.send("Not Founded...")

})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})