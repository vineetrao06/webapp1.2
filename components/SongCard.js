import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigate } from 'react-router-dom';

const SongCard = ({ song }) => {
    const { colors } = useTheme();
    const navigate = useNavigate();

    const handleSongClick = () => {
        navigate(`/songdetails/${song._id}`);
    };

    return (
        <TouchableOpacity
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
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
