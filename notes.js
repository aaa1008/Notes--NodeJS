/*
File: notes.js
Description: provides functionality of reading, saving, adding and reading notes
Author: Abdullah Al Hamoud
*/
const fs = require('fs');

// reads all notes by parsing them using JSON from the file 'notes-data.json'
var fetchNotes = () => {
  try {
    var noteDataString = fs.readFileSync('notes-data.json');
    return notes = JSON.parse(noteDataString);
  } catch (e) {
    return [];
  }
};

// saves notes from the current array of notes using json
var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

// adds a note to the array of notes
var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  // check if the title of the note already exists
  var duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

// returns the list of notes
var getAll = () => {
  return fetchNotes();
};

// deletes a note matching the given title
var remove = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title != title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

// returns a note matching the title
var read = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);

  return filteredNotes[0];
};

// used to print a note to the user
var logNote = (note) => {
  debugger;
  console.log("**********");
  console.log('Title: '+ note.title);
  console.log('Body: '+ note.body);
}

module.exports = {
  addNote,
  getAll,
  remove,
  read,
  logNote
};
