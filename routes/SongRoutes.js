const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Song = require('../models/Song');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'songfiles/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Upload route
router.post('/upload', upload.single('song'), async (req, res) => {
    const song = new Song({
        name: req.file.originalname,
        url: `/songfiles/${req.file.filename}`, // Ensure URL matches served static directory
        uploader: req.body.uploader, // Get uploader's name from request body
        email: req.body.email, // Get uploader's email from request body
        genre: req.body.genre, // Get genre from request body
    });

    try {
        await song.save();
        res.status(200).json({ message: 'Song uploaded successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading song.', error });
    }
});

// Get all songs
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching songs.' });
    }
});

module.exports = router;