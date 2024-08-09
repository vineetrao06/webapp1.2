const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey');

// Save survey data
router.post('/saveSurvey', async (req, res) => {
    const { userId, genres, industry = null, platforms, followers = null, type } = req.body;

    try {
        const existingSurvey = await Survey.findOne({ userId });
        if (existingSurvey) {
            // Update the existing survey data
            existingSurvey.genres = genres;
            existingSurvey.industry = industry;
            existingSurvey.platforms = platforms;
            existingSurvey.followers = followers;
            existingSurvey.type = type; // Ensure the type is updated
            await existingSurvey.save();
        } else {
            // Create a new survey entry
            const newSurvey = new Survey({ userId, genres, industry, platforms, followers, type });
            await newSurvey.save();
        }
        res.status(200).json({ message: 'Survey data saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving survey data.', error });
    }
});

// Get survey data for a user
router.get('/', async (req, res) => {
    const { userId } = req.query;

    try {
        const survey = await Survey.findOne({ userId });
        if (survey) {
            res.json(survey);
        } else {
            res.status(404).json({ message: 'Survey data not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching survey data.', error });
    }
});

module.exports = router;