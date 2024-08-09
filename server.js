const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Import routes
const songRoutes = require('./routes/songRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

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

// Use routes
app.use('/api/songs', songRoutes);
app.use('/api/survey', surveyRoutes);

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