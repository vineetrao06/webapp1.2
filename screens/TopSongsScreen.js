import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'react-native-paper';

function TopSongsScreen() {
    const [songs, setSongs] = useState([]);
    const navigate = useNavigate();
    const { colors } = useTheme();

    useEffect(function () {
        function fetchSongs() {
            axios.get('http://localhost:8082/api/songs')
                .then(response => {
                    if (Array.isArray(response.data)) {
                        setSongs(response.data);
                    } else {
                        console.error('Invalid data format:', response.data);
                        setSongs([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching songs:', error);
                    setSongs([]);
                });
        }

        fetchSongs();
    }, []);

    function handleSongClick(song) {
        navigate(`/songdetails/${song._id}`);
    }

    function renderRow(rowSongs) {
        return (
            <View style={styles.row} key={rowSongs[0]._id}>
                {rowSongs.map(function (song) {
                    return (
                        <TouchableOpacity
                            key={song._id}
                            style={[styles.card, { backgroundColor: colors.background, borderColor: colors.surface }]}
                            onPress={() => handleSongClick(song)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.cardContent}>
                                <Text style={[styles.songName, { color: colors.text }]}>{song.name}</Text>
                                <Text style={[styles.uploader, { color: colors.text }]}>By: {song.uploader}</Text>
                                <Text style={[styles.songPublisher, { color: colors.text }]}>{song.publisher}</Text>
                                <audio controls style={styles.audio}>
                                    <source src={song.url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }

    function chunkArray(array, size) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Top Songs</Text>
            {chunkArray(songs, 4).map(renderRow)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        borderRadius: 8,
        padding: 10,
        width: '23%',
        marginHorizontal: '1%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1, // Add border width
    },
    cardContent: {
        alignItems: 'center',
    },
    songName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    songPublisher: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
        textAlign: 'center',
    },
    audio: {
        width: '100%',
    },
});

export default TopSongsScreen;
