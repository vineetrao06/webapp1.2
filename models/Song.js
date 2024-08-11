const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: String,
    url: String,
    uploader: String, // Store uploader's name
    email: String, // Store uploader's email
    genre: String, // Store song genre
    selectedCreators: String,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;