const fs = require('fs');
const router = require('express').Router();
const { 
    findById, 
    createNewNote, 
    validateNote
} = require('../../lib/index');
const { notes } = require('../../db/db.json');

// The get() method requires two arguments. 
router.get('/notes', (req, res) => {
    return res.json(notes);
});

router.get('/notes/:id', (req, res) => {

    const result = findById(req.params.id, notes);
    if(result) {
        res.json(result);
    }
    else {
        res.send(404);
    }
});

// A route that listens for POST request/ 
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    }
    else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    console.log('deleted');
    const result = req.params.id;

    let filteredResult = notes.filter(function (note) {
        return note.id != result;
    });
    
    pickleNotes = { notes:filteredResult }
    let parsedNotes = JSON.stringify(pickleNotes);
    // pickleNotes = filteredResult;

    console.log(parsedNotes);

    fs.writeFileSync(__dirname + '/../../db/db.json', parsedNotes, (err) => {
        if (err) throw err;
    });

    res.end();
});

module.exports = router;