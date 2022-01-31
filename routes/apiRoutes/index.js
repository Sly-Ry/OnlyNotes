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
    req.body.id = note.length.toString();

    // add animal to json file and note array in this function
    if (!validateAnimal(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    }
    else {
        const animal = createNewAnimal(req.body, note);
        res.json(animal);
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