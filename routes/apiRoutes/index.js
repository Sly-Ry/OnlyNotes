const router = require('express').Router();
const { 
    filterByQuery, 
    findById, 
    createNewNote, 
    validateNote
} = require('../../lib/index');
const { notes } = require('../../db/db.json');

// The get() method requires two arguments. 
router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
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
        const note = createNewNote(req.body, note);
        res.json(note);
    }
});

// router.delete('/notes/:id', (req, res) => {
//     const result = req.params.id;

//     if(result) {
//         res.json(result);
//     }
//     else {
//         res.send(404);
//     }
// });

module.exports = router;