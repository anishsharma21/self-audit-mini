const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { readJsonFile } = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;
let users = [];

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    users = readJsonFile('./models/users.json');
    console.log('Users loaded:', users);
});