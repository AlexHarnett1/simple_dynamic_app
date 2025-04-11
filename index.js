require('dotenv').config();
const express = require('express');
const app = express();
const { initPostgres, addUser, getUsers } = require('./postgres');
const { initMongo, addNote, getNotes } = require('./mongo');

app.use(express.json());

// Users (Postgres)
app.post('/users', async (req, res) => {
  const user = await addUser(req.body.name);
  res.json(user);
});

app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

// Notes (MongoDB)
app.post('/notes', async (req, res) => {
  const note = await addNote(req.body.text);
  res.json(note);
});

app.get('/notes', async (req, res) => {
  const notes = await getNotes();
  res.json(notes);
});

// Start server
const start = async () => {
  await initPostgres();
  await initMongo();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
};

start();
