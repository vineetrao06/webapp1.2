import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import SongCard from './SongCard';

const SongCardContainer = ({ songs }) => {
    // const [songs, setSongs] = useState([]);
    const { colors } = useTheme();

    // useEffect(() => {
    //     async function fetchSongs() {
    //         try {
    //             const response = await axios.post('http://localhost:8082/api/songs/getByIds', { ids: songIds });
    //             setSongs(response.data);
    //         } catch (error) {
    //             console.error('Error fetching songs:', error);
    //         }
    //     }

    //     if (songIds && songIds.length > 0) {
    //         fetchSongs();
    //     }
    // }, [songIds]);

    if (songs.length === 0) {
        return <Text style={{ color: colors.text }}>No songs available</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {songs.map(song => (
                    <SongCard key={song._id} song={song} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
});

export default SongCardContainer;