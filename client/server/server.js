const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { readJsonFile } = require('./db');

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

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
  
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: 'Username or password is incorrect' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    users = readJsonFile('./models/users.json');
    console.log('Users loaded:', users);
});