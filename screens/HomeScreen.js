import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin'; // Import Google Sign-In
import { Button, useTheme, Menu, TextInput } from 'react-native-paper'; // Import React Native Paper components

const HomeScreen = () => {
    const [song, setSong] = useState(null);
    const [songName, setSongName] = useState('');
    const [uploader, setUploader] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State to manage success message
    const [selectedGenre, setSelectedGenre] = useState(''); // State for genre
    const [creatorSearch, setCreatorSearch] = useState(''); // State for creator search
    const [menuVisible, setMenuVisible] = useState(false); // State to control dropdown visibility
    const { colors } = useTheme(); // Access theme colors

    useEffect(() => {
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
            formData.append('email', localStorage.getItem("email")); // Send uploader's email
            formData.append('genre', selectedGenre); // Send genre

            console.log("song genre is " + selectedGenre)
            // console.log("formata that gets sent to axios " + formData)

            try {
                await axios.post('http://localhost:8082/upload', formData);
                setSuccessMessage('Song uploaded successfully!');
                setSong(null);
                setSongName('');
                setSelectedGenre(''); // Clear the selected genre
                setTimeout(() => setSuccessMessage(''), 3000); // Clear the message after 3 seconds
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
                <Text style={[styles.title, { color: colors.primary }]}>Upload a Song</Text>

                <Text style={[styles.label, { color: colors.text }]}>Select Song Genre:</Text>

                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                        <Button
                            mode="contained"
                            style={[styles.button, styles.menuButton, { backgroundColor: colors.onSurface }]}
                            labelStyle={{ color: colors.text }}
                            onPress={() => setMenuVisible(true)}
                        >
                            {selectedGenre || 'Select Genre'}
                        </Button>
                    }
                    contentStyle={styles.menuContent} // Apply custom style to Menu content
                >
                    {['Pop', 'Rock', 'Hip-Hop/Rap', 'Jazz', 'Classical', 'Country', 'Electronic/Dance', 'R&B/Soul', 'Reggae', 'Blues'].map(genre => (
                        <Menu.Item
                            key={genre}
                            onPress={() => {
                                setSelectedGenre(genre);
                                setMenuVisible(false);
                            }}
                            title={genre}
                        />
                    ))}
                </Menu>

                <TextInput
                    style={[styles.searchInput, { backgroundColor: 'transparent', color: colors.onPrimary }]}
                    placeholder="Search for preferred creators"
                    placeholderTextColor={colors.placeholder}
                    textColor={colors.onPrimary}
                    value={creatorSearch}
                    onChangeText={setCreatorSearch}
                />

                <Button
                    mode="contained"
                    style={[styles.button, { backgroundColor: colors.onSurface }]} // Same style for Upload Song and Confirm buttons
                    labelStyle={{ color: colors.text }}
                    onPress={() => document.getElementById('fileInput').click()}
                >
                    Upload Song
                </Button>

                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    accept="audio/*"
                    onChange={handleFileChange}
                />

                {song && (
                    <View style={[styles.audioContainer, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.songName, { color: colors.text }]}>{songName}</Text>
                    </View>
                )}

                <Button
                    mode="contained"
                    style={[styles.button, { backgroundColor: colors.onSurface }]} // Same style for Confirm button
                    labelStyle={{ color: colors.text }}
                    onPress={handleConfirm}
                >
                    Confirm
                </Button>

                {successMessage && (
                    <Text style={[styles.successMessage, { color: 'green' }]}>{successMessage}</Text>
                )}
            </View>
            <View style={styles.flexFiller}></View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    flexFiller: {
        paddingBottom: 1000,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        paddingTop: 50,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    searchInput: {
        width: '60%', // Width for search bar
        height: '1%',
        padding: 10,
        marginBottom: 20,
        // backgroundColor: 'transparent', // Make search bar background transparent
    },

    button: {
        width: '60%', // Width for buttons
        marginVertical: 10,
    },
    menuButton: {
        width: '100%', // Width for genre button
        marginBottom: 30,
    },
    menuContent: {
        width: '100%', // Custom style for Menu content
    },
    audioContainer: {
        marginVertical: 20,
        paddingVertical: 10, // Add vertical padding
        borderWidth: 1,  // Optional: Add border to visualize card
        borderColor: '#ddd', // Optional: Border color
        borderRadius: 5, // Optional: Rounded corners
        width: '60%',
        alignItems: 'center',
    },
    songName: {
        fontSize: 16,
    },
    successMessage: {
        marginTop: 20,
        fontSize: 16,
    },
});

export default HomeScreen;
