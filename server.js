const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const uniqid = require('uniqid')
const notesList = require('./db/db.json');
const fs = require('fs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
// NOTES---------------------------------------------
app.get('/notes', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.post('/api/notes', (req,res) =>{
const { title, text } = req.body;
  
if (req.body) {
  const newTip = {
    title,
    text,
    id : uniqid(),
  };

//   updateData(newTip, './db/db.json');
//   res.json(`Tip added successfully 🚀`);
notesList.push(newTip);
fs.writeFile('./db/db.json', JSON.stringify(notesList, null ,4), (err) =>
err ? console.error(err) : console.info(`\nUpdated Information`)
);
res.send(notesList);
} else {
  res.error('Error in adding tip');
}
});
app.get('/api/notes', (req,res)=> res.json(notesList));

app.delete('/api/notes/:id', (req,res) => {
    const deletedID = req.params.id;
    const deletedPOS = notesList.map((notes) => {return notes.id} ).indexOf(deletedID);
   
    notesList.splice(deletedPOS,1)
    console.log(notesList);

    fs.writeFile('./db/db.json', JSON.stringify(notesList, null ,4), (err) =>
        err ? console.error(err) : console.info(`\nUpdated Information`)
    );
    res.json({});
});
// ---------------------------------------------
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);