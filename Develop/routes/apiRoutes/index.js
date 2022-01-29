const router = require('express').Router();
const {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
} = require('../../lib/notes');

module.exports = router;