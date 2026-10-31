
const express = require('express');

const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Divya" },
    { id: 2, name: "Rahul" }
];

// GET all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// POST - Add student
app.post('/students', (req, res) => {
    students.push(req.body);
    res.status(201).json({
        message: "Student added",
        student: req.body
    });
});

// PUT - Update student
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    student.name = req.body.name;
    res.json(student);
});

// PATCH - Partially update student
app.patch('/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    Object.assign(student, req.body);
    res.json(student);
});

// DELETE - Delete student
app.delete('/students/:id', (req, res) => {
    students = students.filter(s => s.id !== Number(req.params.id));
    res.json({ message: "Student deleted" });
});

app.listen(3000, '0.0.0.0', () => {
    console.log("Student CRUD server running on port 3000");
});