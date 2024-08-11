import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Button, useTheme, Menu, TextInput, Chip } from 'react-native-paper';

const HomeScreen = () => {
    const [song, setSong] = useState(null);
    const [songName, setSongName] = useState('');
    const [uploader, setUploader] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [creatorSearch, setCreatorSearch] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCreatorsNames, setSelectedCreators] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // State to manage error message
    // const [preferredArtists, setPreferredArtists] = useState('');
    const [nameIdMap, setNameIdMap] = useState([]);
    const { colors } = useTheme();


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 20,
            backgroundColor: colors.background,
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
            color: colors.primary,
        },
        subtitle: {
            fontSize: 18, 
            marginBottom: 20,
            color: '#888'
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

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userInfo = await GoogleSignin.getCurrentUser();
                if (userInfo) {
                    setUploader(localStorage.getItem("name"));
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

    function getFirstIds(selectedCreatorsIds, nameIdMap) {
        return selectedCreatorsIds.map(name => {
            const id = nameIdMap[name];
            // If the ID is an array, return the first element, otherwise return the ID directly
            return Array.isArray(id) ? id[0] : id;
        });
    }

    async function handleConfirm() {
        console.log('this will be the array going into the database from handleConfirm', selectedCreatorsNames)
        console.log('this will be name id map from handleConfirm', nameIdMap)

        const selectedCreatorsIds = getSelectedIds(selectedCreatorsNames, nameIdMap)
        console.log('selected creator ids from handleConfirm', selectedCreatorsIds)
        localStorage.setItem('selectedCreatorsIdsFromUser', selectedCreatorsIds)


        if (!selectedGenre) {
            setErrorMessage('Please select a genre.');
            return;
        }

        if (song) {
            const formData = new FormData();
            setUploader(localStorage.getItem("name"));

            formData.append('song', song);
            formData.append('uploader', localStorage.getItem("name"));
            formData.append('email', localStorage.getItem("email"));
            formData.append('genre', selectedGenre);
            formData.append('selectedCreators', selectedCreatorsIds);

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

    // const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Daisy Miller', 'Evan Davis', 'Fiona Clark', 'George Harris', 'Hannah Lee', 'Ian Walker', 'Jane Adams'];


    async function getSurveyData() {
        try {
            const response = await axios.get('http://localhost:8082/api/survey/');
            const surveyData = response.data
            const surveyDataNames = surveyData.map(item => item.name)
            setNameIdMap(createNameIdMapping(response))
            console.log(nameIdMap)
            console.log(response)
            
            return surveyDataNames

        } catch (error) {
            console.error('Error fetching data:', error); // Handle the error
            return "Does not work"

        }
    }

    function handleSearchChange(text) {
        setCreatorSearch(text);

        getSurveyData().then(namesFromDatabase => {
            console.log(namesFromDatabase); // Now this will correctly log the array of names from the database
            setSuggestions(namesFromDatabase.filter(name => name.toLowerCase().includes(text.toLowerCase())));

        })
    }

    function createNameIdMapping(response) {
        const nameIdMap = {};

        response.data.forEach(item => {
            const { name, _id } = item;

            if (nameIdMap[name]) {
                // If the name already exists, push the new ID into the array
                if (Array.isArray(nameIdMap[name])) {
                    nameIdMap[name].push(_id);
                } else {
                    // Convert the single ID to an array if not already
                    nameIdMap[name] = [nameIdMap[name], _id];
                }
            } else {
                // If the name doesn't exist, add it to the object
                nameIdMap[name] = _id;
            }
        });

        return nameIdMap;
    }

    function getSelectedIds(selectedCreatorsNames, nameIdMap) {
        let selectedIds = [];

        selectedCreatorsNames.forEach(name => {
            if (nameIdMap[name]) {
                if (Array.isArray(nameIdMap[name])) {
                    selectedIds = selectedIds.concat(nameIdMap[name]);
                } else {
                    selectedIds.push(nameIdMap[name]);
                }
            }
        });

        return selectedIds;
    }


    function handleTagPress(name) {
        if (!selectedCreatorsNames.includes(name)) {
            setSelectedCreators([...selectedCreatorsNames, name]);
        }
        setCreatorSearch('');
        setSuggestions([]);
    }

    function handleTagRemove(name) {
        setSelectedCreators(selectedCreatorsNames.filter(item => item !== name));
    }
    
    const userType = localStorage.getItem('userType')
    // console.log(userType)
    if (userType === "Influencer") {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Songs that others requested to you</Text>
                <Text style={styles.subtitle}>Based on your preferences</Text>
                
            </View>
        )
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
                    {selectedCreatorsNames.map(name => (
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

export default HomeScreen;
