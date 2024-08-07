const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 8082;

// Middleware
app.use(cors());
app.use(express.json());

// Configure MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/songdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Song Schema
const songSchema = new mongoose.Schema({
    name: String,
    url: String,
    uploader: String, // Store uploader's name
    email: String, // Store uploader's email
    genre: String, // Store song genre
});

const Song = mongoose.model('Song', songSchema);

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
app.post('/upload', upload.single('song'), async (req, res) => {
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
app.get('/api/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching songs.' });
    }
});

// Serve static files for uploads
app.use('/songfiles', express.static(path.resolve(__dirname, 'songfiles')));

// Serve static files and handle frontend routing (production)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });
}

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
