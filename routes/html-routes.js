const router = require('express').Router();
const path = require('path');

// Defines the route as a response to request for the notes page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});
//defines the route as a response for notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

module.exports = router;