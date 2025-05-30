require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import path module

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

// Serve index.html when accessing "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Mock user data (in a real application, use a database)
const users = [
  { username: 'ADMIN2025', password: bcrypt.hashSync('Mangu@1925', 10) } // Store hashed password
];

// Mock student data
let students = [];

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Middleware to protect routes
function isAuthenticated(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.user = decoded;
    next();
  });
}

// Get all students
app.get('/students', isAuthenticated, (req, res) => {
  res.json(students);
});

// Add a new student
app.post('/students', isAuthenticated, (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update a student
app.put('/students/:admissionNo', isAuthenticated, (req, res) => {
  const { admissionNo } = req.params;
  const updatedStudent = req.body;

  const index = students.findIndex(s => s.admissionNo === admissionNo);
  if (index !== -1) {
    students[index] = { ...students[index], ...updatedStudent };
    res.json(students[index]);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Delete a student
app.delete('/students/:admissionNo', isAuthenticated, (req, res) => {
  const { admissionNo } = req.params;
  students = students.filter(s => s.admissionNo !== admissionNo);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
