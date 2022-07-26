const fs = require('fs');
const util = require('util');

const rdCurrent = util.promisify(fs.readFile);

const addNew = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content), (err) =>
    err ? console.error(err) : console.info(`\nUpdated Information ${destination}`)
  );


const updateData = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      addNew(file, parsedData);
    }
  });
};

module.exports = { rdCurrent, addNew, updateData };
