import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin'; // Import Google Sign-In
import { Button, useTheme } from 'react-native-paper'; // Import React Native Paper components

const HomeScreen = () => {
    const [song, setSong] = useState(null);
    const [songName, setSongName] = useState('');
    const [uploader, setUploader] = useState('');
    const { colors } = useTheme(); // Access theme colors

    useEffect(function () {
        // Function to fetch user info
        async function fetchUserInfo() {
            try {
                const userInfo = await GoogleSignin.getCurrentUser(); // Get user info
                if (userInfo) {
                    setUploader(localStorage.getItem("name")); // Set uploader info
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        }

        fetchUserInfo();
    }, []);

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            setSong(file);
            setSongName(file.name);
        }
    }

    async function handleConfirm() {
        if (song) {
            const formData = new FormData();
            setUploader(localStorage.getItem("name")); // Set uploader info

            formData.append('song', song);
            formData.append('uploader', localStorage.getItem("name")); // Send uploader's info

            try {
                await axios.post('http://localhost:8082/upload', formData);
                alert('Song uploaded successfully!');
                setSong(null);
                setSongName('');
            } catch (error) {
                console.error('Error uploading song:', error);
                alert('Failed to upload song.');
            }
        } else {
            alert('Please upload a song first.');
        }
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>Upload a Song</Text>

                <Button
                    mode="contained"
                    style={[styles.button, { backgroundColor: colors.onBackground}]}
                    onPress={() => document.getElementById('fileInput').click()}
                >
                    <Text style={{ color: colors.onPrimary }}>Upload Song</Text>
                </Button>

                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    accept="audio/*"
                    onChange={handleFileChange}
                />

                {song && (
                    <View style={[styles.audioContainer, { backgroundColor: colors.onSurface }]}>
                        <Text style={[styles.songName, { color: colors.text }]}>{songName}</Text>
                    </View>
                )}
            </View>

            <Button
                mode="contained"
                style={[styles.button, { backgroundColor: '#28a745' }]} // Override for confirm button
                onPress={handleConfirm}
            >
                <Text style={{ color: colors.onPrimary }}>Confirm</Text>
            </Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        marginVertical: 10,
        width: '80%',
    },
    audioContainer: {
        marginVertical: 20,
        paddingBottom: 20, // Add extra white space at the bottom of each song card
        borderWidth: 1,  // Optional: Add border to visualize card
        borderColor: '#ddd', // Optional: Border color
        borderRadius: 5, // Optional: Rounded corners
    },
    songName: {
        fontSize: 16,
    },
});

export default HomeScreen;
