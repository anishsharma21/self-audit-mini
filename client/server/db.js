const fs = require('fs');
const path = require('path');

function readJsonFile(filename) {
    const rawData = fs.readFileSync(path.resolve(__dirname, filename));
    return JSON.parse(rawData);
}

module.exports = {
    readJsonFile,
};