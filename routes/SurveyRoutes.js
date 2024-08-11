const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey');

// Save survey data
router.post('/saveSurvey', async (req, res) => {
    const { userId, genres, industry = null, platforms, followers = null, type, name, email } = req.body;

    console.log('Received survey data:', {
        userId,
        genres,
        industry,
        platforms,
        followers,
        type,
        name,
        email
    });

    try {
        const existingSurvey = await Survey.findOne({ userId });
        if (existingSurvey) {
            // Update the existing survey with the new data
            existingSurvey.genres = genres;
            existingSurvey.industry = industry;
            existingSurvey.platforms = platforms;
            existingSurvey.followers = followers;
            existingSurvey.type = type;
            existingSurvey.name = name;
            existingSurvey.email = email;
            await existingSurvey.save();
        } else {
            // Create a new survey if one doesn't exist for the user
            const newSurvey = new Survey({ userId, genres, industry, platforms, followers, type, name, email });
            await newSurvey.save();
            console.log('Saved survey:', newSurvey);
        }
        res.status(200).json({ message: 'Survey data saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving survey data.', error });
    }
});

// Get all survey data or survey data for a specific user
router.get('/', async (req, res) => {
    const { userId } = req.query;

    try {
        let surveys;
        if (userId) {
            // Fetch survey data for a specific user if userId is provided
            surveys = await Survey.findOne({ userId });
        } else {
            // Fetch all surveys if no userId is provided
            surveys = await Survey.find();
        }

        if (surveys && surveys.length > 0) {
            res.json(surveys);
        } else {
            res.status(404).json({ message: 'Survey data not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching survey data.', error });
    }
});

module.exports = router;