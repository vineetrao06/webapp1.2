import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { useParams } from 'react-router-native'; // Note: use react-router-native instead of react-router-dom for React Native

const SongDetailsScreen = () => {
    const { id } = useParams(); // Get the song ID from the URL
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);

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
        return <Text>Loading...</Text>;
    }

    if (!song) {
        return <Text>Song not found</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.songName}>{song.name}</Text>
            <Text style={styles.uploader}>By: {song.uploader}</Text>
            <Text style={styles.price}>Price: $50</Text> {/* Placeholder price */}
            <Text style={styles.genre}>Genre: Placeholder Genre</Text> {/* Placeholder genre */}
            {/* Replace <audio> element with a React Native audio player */}
            <Button title="Play Song" onPress={() => console.log(`Playing ${song.url}`)} />
            <Button title="Back to Top Songs" onPress={() => window.history.back()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    songName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    uploader: {
        fontSize: 18,
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        marginBottom: 10,
    },
    genre: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default SongDetailsScreen;
