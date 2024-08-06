import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'react-native-paper';
import SongCard from '../components/SongCard';

function TopSongsScreen() {
    const [songs, setSongs] = useState([]);
    const navigate = useNavigate();
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

    function renderRow(rowSongs) {
        return (
            <View style={styles.row} key={rowSongs[0]._id}>
                {rowSongs.map(song => (
                    <SongCard key={song._id} song={song} />
                ))}
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
        <View>
            <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.title, { color: colors.primary }]}>Top Songs</Text>
                {chunkArray(songs, 4).map(renderRow)}
            </ScrollView>
        </View>
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
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});

export default TopSongsScreen;
