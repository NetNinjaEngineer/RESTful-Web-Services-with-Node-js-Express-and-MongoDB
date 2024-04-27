const express = require('express')
const path = require('path')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())


const port = process.env.PORT || 7000

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

// create new student

app.post('/api/students', (request, response) => {
    request.body.id = students.length + 1;
    students.push(request.body);
    response.json(request.body)
})


// delete exist student
app.delete('/api/students/:id', (request, response) => {
    let studentId = parseInt(request.params.id);

    let studentIndex = students.findIndex(std => std.id === studentId);

    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        response.status(200).json({ message: `Student with ID ${studentId} deleted successfully` });
    } else {
        response.status(404).json({ error: `Student with ID ${studentId} not found` });
    }


})


// updated existed student

app.put('/api/students/:id', (request, response) => {
    let studentId = parseInt(request.params.id);
    let updatedStudent = request.body;

    const index = students.findIndex(student => student.id === studentId);

    if (index !== -1) {
        students[index] = { ...students[index], ...updatedStudent }
        response.sendStatus(204);
    } else {
        response.status(404).json({ error: `student with id: ${studentId} was not found` })
    }

})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})