const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { readJsonFile } = require('./db');
const fs = require('fs');
require('dotenv').config();
const axios = require('axios');
const notionHeaders = {
  "Authorization": `Bearer ${process.env.NOTION_API_KEY}`,
  "Notion-Version": "2021-08-16"
};

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

app.get('/notion', async (req, res) => {
  try {
    const response = await axios.get(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}`, { headers: notionHeaders });
    res.json(response.data);
  } catch (error) {
    console.error(error.response.data); // Log the error data
    res.json({ error: error.message });
  }
});

app.post('/notion/:databaseId/query', async (req, res) => {
  const notionHeaders = {
    "Authorization": `Bearer ${process.env.NOTION_API_KEY}`,
    "Content-Type": "application/json",
    "Notion-Version": "2021-08-16"
  };

  const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in the format YYYY-MM-DD

  try {
    const response = await axios.post(`https://api.notion.com/v1/databases/${req.params.databaseId}/query`, {
      filter: {
        "property": "Date",
        "date": {
          "equals": currentDate
        }
      },
      sorts: req.body.sorts
    }, { headers: notionHeaders });

    res.json(response.data);
  } catch (error) {
    console.error(error.response.data); // Log the error data
    res.json({ error: error.message });
  }
});

app.get('/notion/:pageId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.notion.com/v1/pages/${req.params.pageId}`, { headers: notionHeaders });
    res.json(response.data);
  } catch (error) {
    console.error(error.response.data); // Log the error data
    res.json({ error: error.message });
  }
});

app.post('/notion', async (req, res) => {
  const notionHeaders = {
    "Authorization": `Bearer ${process.env.NOTION_API_KEY}`,
    "Content-Type": "application/json",
    "Notion-Version": "2021-08-16"
  };

  try {
    const response = await axios.post(`https://api.notion.com/v1/pages`, {
      parent: { database_id: req.body.parent.database_id },
      properties: req.body.properties
    }, { headers: notionHeaders });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

app.patch('/notion/:pageId', async (req, res) => {
  try {
    const properties = req.body.properties;
    let updatedProperties = {};

    for (let key in properties) {
      if (properties[key].hasOwnProperty('number')) {
        updatedProperties[key] = {
          "rich_text": [
            {
              "text": {
                "content": `${properties[key].number}`
              }
            }
          ]
        };
      } else if (properties[key].hasOwnProperty('title')) {
        updatedProperties[key] = {
          "title": [
            {
              "text": {
                "content": properties[key].title[0].text.content
              }
            }
          ]
        };
      } else if (properties[key].hasOwnProperty('date')) {
        updatedProperties[key] = {
          "date": {
            "start": properties[key].date.start
          }
        };
      } else if (properties[key].hasOwnProperty('rich_text')) {
        updatedProperties[key] = {
          "rich_text": [
            {
              "text": {
                "content": properties[key].rich_text[0].text.content
              }
            }
          ]
        };
      }
    }

    const response = await axios.patch(`https://api.notion.com/v1/pages/${req.params.pageId}`, {
      properties: updatedProperties
    }, { headers: notionHeaders });

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.error(error.response.data); // Log the error data if response exists
    } else {
      console.error(error); // Log the error itself if no response
    }
    res.json({ error: error.message });
  }
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