const router = require('express').Router();
const { 
    filterByQuery, 
    findById, 
    createNewNote, 
    validateNote
} = require('../../lib/index');
const { db } = require('../../db/db');

// The get() method requires two arguments. 
router.get('/db', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// A param route must come after the other GET route.
router.get('/db/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if(result) {
        res.json(result);
    }
    else {
        res.send(404);
    }
});

// A route that listens for POST request/ 
router.post('/db', (req, res) => {

    req.body.id = notes.length.toString();

    // add animal to json file and notes array in this function
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    }
    else {
        const animal = createNewAnimal(req.body, notes);
        res.json(animal);
    }
});

module.exports = router;

module.exports = router;