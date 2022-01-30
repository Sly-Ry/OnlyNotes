const fs = require('fs');
const path = require('path');

// 
function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    
    if(query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if(query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
};

// Find notes by their id
function findById(id, notesArray) {
    const results = notesArray.filter(note => note.id === id)[0];
    return results;
};

// Creates a new note
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    );
    return note;
};

// Guarentees a note will not be created unless certain criteria are met
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
};