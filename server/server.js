const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { readJsonFile } = require('./db');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;
let users = [];

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
  
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
}

app.use(cors());
app.use(bodyParser.json());

app.get('/profile', authenticateJWT, (req, res) => {
    res.json({ message: 'You are authenticated', user: req.user });
});

app.post('/register', (req, res) => {
    users = readJsonFile('./models/users.json');
    const { username, password, email } = req.body;
  
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
  
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email is already in use' });
    }
  
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = { id: Date.now(), username, password: hashedPassword, email };
  
    users.push(newUser);
  
    // Write the updated users array back to users.json
    fs.writeFileSync('./models/users.json', JSON.stringify(users, null, 2));
    const fileContents = fs.readFileSync('./models/users.json', 'utf8');
  
    res.status(201).json({ message: 'User registered successfully' });
    console.log('New user registered:', newUser);
});

app.post('/login', (req, res) => {
  users = readJsonFile('./models/users.json');
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }); // Set the token as a HTTP-only cookie
    res.status(200).json({ token });
  } else {
    res.status(400).json({ message: 'Username or password is incorrect' });
  }

  if (user) {
    console.log('User found:', user);
  } else {
    console.log('No user found with username:', username);
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    users = readJsonFile('./models/users.json');
    console.log('Users loaded:', users);
});