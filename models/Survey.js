const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    userId: String, // To associate the survey with a user
    genres: [String],
    industry: String,
    platforms: [String],
    followers: Number,
    type: String,
    name: String,
    email: String,
}, { timestamps: true }); // Add timestamps to track when the data was created/updated

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;