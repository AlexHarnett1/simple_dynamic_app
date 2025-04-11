const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: String,
});

const Note = mongoose.model('Note', noteSchema);

async function initMongo() {
  await mongoose.connect(process.env.MONGO_URI);
}

async function addNote(text) {
  const note = new Note({ text });
  return await note.save();
}

async function getNotes() {
  return await Note.find();
}

module.exports = { initMongo, addNote, getNotes };
