/*
File: app.js
Description: command line interaction file with the user.
Author: Abdullah Al Hamoud
*/

// require APIs to use
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

// require file that will have functionality of the notes app
const notes = require('./notes.js');

// title arguments to be used for commands that require a note title
const titleArg = {
  describe: 'Note title',
  demand: true,
  alias: 't' };

// body arguments to be used for commands that require a note body
const bodyArg = {
  describe: 'Note body',
  demand: true,
  alias: 'b' };

// program commands using the yargs API
const argv = yargs
  .command('add', 'Add a new note', {
    title: { titleArg },
    body: { bodyArg }
    })
  .command('list', 'List all notes')
  .command('read', 'Read a note',{
    title: { titleArg } }
  )
  .command('remove', 'Remove a note',{
    title: titleArg
  })
  .help()
  .argv;

// fetch the command to perform
var command = argv._[0];

if (command === 'add'){
  // add command functionality

  //attempt to add a note
  var result = notes.addNote(argv.title, argv.body);
  if (result) {
    console.log("Note Saved");
    notes.logNote(result);
  } else {
    console.log("Error, duplicate title");
  }

} else if (command === 'list') {
  // list command functionality

  // fetch all notes
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));

} else if (command === 'remove') {
  // remove command functionality

  // attempt to remove a note
  var noteRemoved = notes.remove(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);

} else if (command === 'read') {
  // read command functionality

  // attempt to read a note
  var note = notes.read(argv.title);
  if (note){
    console.log("Note Read");
    notes.logNote(note);
  }
  else {
    console.log("Error, note not found");
  }

} else {
  // if the command wasn't found
  console.log('Unknown command');
}
