const notes = require('express').Router();
const idGen = require('../helpers/randIdGen');
const { readFromFile, readAndAppend } = require('../helpers/readAndAppend');

notes.get('/', (req,res)=>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newTip = {
        title,
        text,
        note_id: idGen(),
      };
  
      readAndAppend(newTip, './db/db.sjon');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });
  module.exports = notes;