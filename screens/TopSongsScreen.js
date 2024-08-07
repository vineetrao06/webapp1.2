import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import SongCard from '../components/SongCard';

function TopSongsScreen() {
    const [songs, setSongs] = useState([]);
    const { colors } = useTheme();

    useEffect(() => {
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

    function renderSongsByGenre(genre) {
        const filteredSongs = songs.filter(song => song.genre === genre);
        if (filteredSongs.length === 0) return null;

        return (
            <View key={genre} style={styles.genreContainer}>
                <Text style={[styles.genreTitle, { color: colors.primary }]}>{genre}</Text>
                <View style={styles.row}>
                    {filteredSongs.map(song => (
                        <SongCard key={song._id} song={song} />
                    ))}
                </View>
            </View>
        );
    }

    const genres = ['Pop', 'Rock', 'Hip-Hop/Rap', 'Jazz', 'Classical', 'Country', 'Electronic/Dance', 'R&B/Soul', 'Reggae', 'Blues'];

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.primary }]}>Top Songs</Text>
                    {genres.map(renderSongsByGenre)}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: 'transparent',
    },
    container: {
        padding: 10,
        marginLeft: 80,
        marginRight: 80,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    genreContainer: {
        marginBottom: 30,
    },
    genreTitle: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
});

export default TopSongsScreen;
