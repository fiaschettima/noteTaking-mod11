const notes = require('express').Router();
const { rdCurrent, updateData } = require('../helpers/fsHelp');
const uniqid = require('uniqid')

notes.get('/', (req,res)=>{
  rdCurrent('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newTip = {
        title,
        text,
        id : uniqid(),
      };
  
      updateData(newTip, './db/db.json');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });
  notes.delete('/:id')
  // Delete route api/notes/:id   (read all notes remove note with given id then rewrite db.json)
  module.exports = notes;