import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Button, useTheme, Menu, TextInput, Chip } from 'react-native-paper';

const HomeScreen = () => {
    const [song, setSong] = useState(null);
    const [songName, setSongName] = useState('');
    // const [uploader, setUploader] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [creatorSearch, setCreatorSearch] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCreators, setSelectedCreators] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    // const [userType, setUserType] = useState(''); // State to store user type
    
    
    const userType = localStorage.getItem('userType')
    const uploader = localStorage.getItem('name')
    const { colors } = useTheme();

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userInfo = await GoogleSignin.getCurrentUser();
                if (userInfo) {
                    
                    // let fetchedUserType = localStorage.getItem('userType'); // this will only be available in the next asyc cycle
                    
                    // setUserType(fetchedUserType)
                    // setUploader(localStorage.getItem("name"));
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        }

        console.log('user type localstorage:', localStorage.getItem('userType'))
        console.log('user type variable:', userType)


        fetchUserInfo();
    }, []);



    if (userType === 'Influencer') {
        // Render a blank screen or a message for influencers
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.content}>
                    <Text style={[styles.title, { color: colors.primary }]}>Welcome, {uploader}!</Text>
                    <Text style={{ color: colors.text }}>This page is only for song artists.</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Function to handle file input change
    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            setSong(file);
            setSongName(file.name);
        }
    }

    // Function to handle the confirm button click
    async function handleConfirm() {
        console.log('user type localstorage:', localStorage.getItem('userType'))
        console.log('user type variable:', userType)

        if (!selectedGenre) {
            setErrorMessage('Please select a genre.');
            return;
        }

        console.log

        if (song) {
            const formData = new FormData();
            setUploader(localStorage.getItem("name"));

            formData.append('song', song);
            formData.append('uploader', localStorage.getItem("name"));
            formData.append('email', localStorage.getItem("email"));
            formData.append('genre', selectedGenre);

            try {
                await axios.post('http://localhost:8082/api/songs/upload', formData);
                setSuccessMessage('Song uploaded successfully!');
                setSong(null);
                setSongName('');
                setSelectedGenre('');
                setTimeout(() => setSuccessMessage(''), 3000);
                setErrorMessage(''); // Clear error message on successful upload
            } catch (error) {
                console.error('Error uploading song:', error);
                alert('Failed to upload song.');
            }
        } else {
            setErrorMessage('Please upload a song first.');
        }
    }

    // Function to handle creator search input change
    function handleSearchChange(text) {
        setCreatorSearch(text);
        setSuggestions(names.filter(name => name.toLowerCase().includes(text.toLowerCase())));
    }

    // Function to handle the selection of a creator
    function handleTagPress(name) {
        if (!selectedCreators.includes(name)) {
            setSelectedCreators([...selectedCreators, name]);
        }
        setCreatorSearch('');
        setSuggestions([]);
    }

    // Function to handle the removal of a selected creator
    function handleTagRemove(name) {
        setSelectedCreators(selectedCreators.filter(item => item !== name));
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
                    contentStyle={[styles.menuContent, { backgroundColor: colors.surface }]}
                >
                    {['Pop', 'Rock', 'Hip-Hop/Rap', 'Jazz', 'Classical', 'Country', 'Electronic/Dance', 'R&B/Soul', 'Reggae', 'Blues'].map(genre => (
                        <Menu.Item
                            key={genre}
                            onPress={() => {
                                setSelectedGenre(genre);
                                setMenuVisible(false);
                            }}
                            title={genre}
                            titleStyle={{ color: colors.text }}
                        />
                    ))}
                </Menu>

                <View style={styles.searchContainer}>
                    <TextInput
                        style={[styles.searchInput, { backgroundColor: 'transparent' }]}
                        placeholder="Search for preferred creators (optional)"
                        placeholderTextColor={colors.placeholder}
                        textColor={colors.onPrimary}
                        value={creatorSearch}
                        onChangeText={handleSearchChange}
                    />
                    <View style={styles.suggestions}>
                        {suggestions.map(name => (
                            <TouchableOpacity key={name} onPress={() => handleTagPress(name)}>
                                <Text style={[styles.suggestionItem, { backgroundColor: colors.onBackground, color: colors.onPrimary }]}>{name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.tagsContainer}>
                    {selectedCreators.map(name => (
                        <Chip
                            key={name}
                            onClose={() => handleTagRemove(name)}
                            style={styles.chip}
                        >
                            {name}
                        </Chip>
                    ))}
                </View>

                <Button
                    mode="contained"
                    style={[styles.button, { backgroundColor: colors.onSurface }]}
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
                    style={[styles.button, { backgroundColor: colors.onSurface }]}
                    labelStyle={{ color: colors.text }}
                    onPress={handleConfirm}
                >
                    Confirm
                </Button>

                {successMessage && (
                    <Text style={[styles.successMessage, { color: colors.primary }]}>{successMessage}</Text>
                )}

                {errorMessage && (
                    <Text style={[styles.errorMessage, { color: colors.error }]}>{errorMessage}</Text>
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
    searchContainer: {
        width: '60%',
        marginBottom: 20,
    },
    searchInput: {
        width: '100%',
    },
    suggestions: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: "#121212",
        borderWidth: 1,
        marginTop: 5,
        maxHeight: 100,
        overflow: 'scroll',
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    chip: {
        margin: 5,
    },
    button: {
        width: '60%',
        marginVertical: 10,
    },
    menuButton: {
        width: '100%',
        marginBottom: 30,
    },
    menuContent: {
        width: '100%',
    },
    audioContainer: {
        marginVertical: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
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
    errorMessage: {
        marginTop: 20,
        fontSize: 16,
    },
});

export default HomeScreen;
