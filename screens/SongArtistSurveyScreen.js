import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import { useTheme } from 'react-native-paper';
import axios from 'axios';

const surveyJSON = {
    pages: [
        {
            name: "genresPage",
            elements: [
                {
                    isRequired: "true",
                    type: "checkbox",
                    name: "genres",
                    title: "What music genres do you make music in? Feel free to select multiple.",
                    choices: ["Pop", "Rock", "Hip-Hop/Rap", "Jazz", "Classical", "Country", "Electronic/Dance", "R&B/Soul", "Reggae", "Blues"]
                }
            ]
        },
        {
            name: "platformsPage",
            elements: [
                {
                    isRequired: "true",
                    type: "checkbox",
                    name: "platforms",
                    title: "What social media platforms would you like your music to be promoted on? Choose as many as you like",
                    choices: ["Facebook", "Instagram", "Tiktok", "Snapchat", "Youtube", "Twitter"]
                }
            ]
        }
    ]
};

const SongArtistSurveyScreen = ({ onLogin }) => {
    const navigate = useNavigate();
    const survey = new Model(surveyJSON);
    const { colors } = useTheme();

    survey.applyTheme({
        // Apply your custom theme here
    });

    async function sendPostRequest(result) {
        const userIdFromSignIn = localStorage.getItem('userID');
        console.log('now sending the post req');

        try {
            const response = await axios.post('http://localhost:8082/api/survey/saveSurvey', {
                userId: userIdFromSignIn,
                type: 'Song Artist', // Add the type field
                industry: null, // Set industry to null for song artists
                followers: null, // Set followers to null for song artists
                ...result.data, // This spreads the survey data into the POST request
            });
            console.log('Server Response:', response.data);
        } catch (error) {
            console.error('Error saving survey:', error);
        }
    }

    const handleSurveyComplete = (result) => {
        console.log('Survey Result:', result.data);
        sendPostRequest(result);
        onLogin();
        navigate('/'); // Redirect to home page after survey completion
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
        },
        flexFiller: {
            paddingBottom: 1000,
        },
    });

    return (
        <View style={styles.container}>
            <Survey
                model={survey}
                onComplete={handleSurveyComplete}
            />
            <View style={styles.flexFiller}></View>
        </View>
    );
};

export default SongArtistSurveyScreen;