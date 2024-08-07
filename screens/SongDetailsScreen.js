import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useParams } from 'react-router-native'; // Note: use react-router-native instead of react-router-dom for React Native
import { useTheme, Button } from 'react-native-paper';

const SongDetailsScreen = () => {
    const { id } = useParams(); // Get the song ID from the URL
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme();

    function findSongUrlById(songs, id) {
        // Iterate through the array of songs
        for (let i = 0; i < songs.length; i++) {
            // Check if the current song's _id matches the given id
            if (songs[i]._id === id) {
                // Return the url of the matching song
                return songs[i];
            }
        }
        // Return null if no match is found
        return null;
    }

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/songs/`);
                const songs = response.data;
                const songData = findSongUrlById(songs, id);

                if (songData) {
                    setSong(songData); // Set the whole song object, not just the URL
                } else {
                    console.log('Song not found');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching song details:', error);
                setLoading(false);
            }
        };

        fetchSongDetails();
    }, [id]);

    if (loading) {
        return <Text style={[styles.text, { color: colors.text }]}>Loading...</Text>;
    }

    if (!song) {
        return <Text style={[styles.text, { color: colors.text }]}>Song not found</Text>;
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.songName, { color: colors.primary }]}>{song.name}</Text>
            <Text style={[styles.uploader, { color: colors.text }]}>By: {song.uploader}</Text>
            <Text style={[styles.price, { color: colors.text }]}>Price: $50</Text> {/* Placeholder price */}
            <Text style={[styles.genre, { color: colors.text }]}>Genre: Placeholder Genre</Text> {/* Placeholder genre */}
            {/* Replace <audio> element with a React Native audio player */}
            <Button
                mode="contained"
                style={styles.button}
                onPress={() => playSong() }
            >
                Play Song
            </Button>
            <Button
                mode="contained"
                style={styles.button}
                onPress={() => window.history.back()}
            >
                Back to Top Songs
            </Button>
            <View style={[styles.flexFiller]}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        textAlign: 'center',
        marginBottom: 20,
    },

    flexFiller: {
        paddingBottom: 1000,
    },
    songName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    uploader: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    price: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    genre: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        marginVertical: 10,
        width: '20%',
    },
});

export default SongDetailsScreen;
