// SongCard.js

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigate } from 'react-router-dom';

const SongCard = ({ song }) => {
    const { colors } = useTheme();
    const navigate = useNavigate();

    const handleSongClick = () => {
        navigate(`/songdetails/${song._id}`);
    };

    return (
        <Pressable
            style={[styles.card, { backgroundColor: colors.background, borderColor: colors.surface }]}
            onPress={handleSongClick}
            activeOpacity={0.8}
        >
            <View style={styles.cardContent}>
                <Text style={[styles.songName, { color: colors.text }]}>{song.name}</Text>
                <Text style={[styles.uploader, { color: colors.text }]}>By: {song.uploader}</Text>
                <audio controls style={styles.audio}>
                    <source src={song.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        padding: 10,
        width: '23%', // Adjust this if necessary to fit 4 cards in a row
        marginHorizontal: '1%',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
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
    uploader: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
        textAlign: 'center',
    },
    audio: {
        width: '100%',
    },
});

export default SongCard;