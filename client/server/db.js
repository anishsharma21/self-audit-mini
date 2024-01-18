const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function readJsonFile(filename) {
    const rawData = fs.readFileSync(path.resolve(__dirname, filename));
    const data = JSON.parse(rawData);
  
    if (filename === './models/users.json') {
      data.forEach(user => {
        user.password = bcrypt.hashSync(user.password, saltRounds);
      });
    }
  
    return data;
}

module.exports = {
    readJsonFile,
};