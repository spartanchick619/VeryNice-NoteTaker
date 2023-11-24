const apiRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");

apiRouter.get('/notes', async (req, res) => {
  const dbJson = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
  console.log(dbJson);
  res.json(dbJson);
});

apiRouter.post('/notes', (req, res) => {
  const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  const newFeedback = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  dbJson.push(newFeedback);
  console.log(`Note ${newFeedback.id} Created.`);
  fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
  res.json(dbJson);
});

apiRouter.delete('/notes/:id', (req, res) => {
  console.log(`Delete called for: ${req.params.id}`);
  let data = fs.readFileSync("db/db.json", "utf8");
  const dataJSON =  JSON.parse(data);
  const newNotes = dataJSON.filter((note) => { 
    return note.id !== req.params.id;
  });
  fs.writeFileSync("db/db.json",JSON.stringify(newNotes));
  res.json(newNotes);
});

module.exports = apiRouter; 