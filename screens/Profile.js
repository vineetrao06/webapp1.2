import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import SongCard from '../components/SongCard';
import SongCardContainer from '../components/SongCardContainer';

const Profile = () => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const picture = localStorage.getItem('picture');
    const userId = localStorage.getItem('userID')

    const [songs, setSongs] = useState([]);
    const [songIds, setSongIds] = useState([]);
    const { colors } = useTheme();

    useEffect(() => {
        async function getSongDetails() {
            const response = await axios.get(`http://localhost:8082/api/songs/`);
            const songsResponse = response.data;
            console.log(songsResponse.map(song => song._id))

            setSongIds(songsResponse.map(song => song._id))
        
            const songsByUploader = getSongsByUploader(email, songsResponse);
            setSongs(songsByUploader);
        }
        console.log("current user's email: " + email)

        getSongDetails();
    }, [name]);

    function getSongsByUploader(uploaderEmail, songs) {
        return songs.filter(song => song.email === uploaderEmail);
    }

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
        <ScrollView style={styles.scrollView} contentContainerStyle={[styles.contentContainer, { backgroundColor: colors.background }]}>
            <Image source={{ uri: picture }} style={styles.profilePicture} />
            <Text style={[styles.name, { color: colors.onPrimary }]}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
            <Text style={[styles.name, { color: colors.primary, paddingTop: 20 }]}>Your Songs</Text>
            {/* {chunkArray(songs, 4).map(renderRow)} */}
            <SongCardContainer songs={songs}></SongCardContainer>
            <View style={styles.flexFiller}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: '#888',
        marginBottom: 20,
    },
    flexFiller: {
        paddingBottom: 1000,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Distribute space evenly
        width: '100%',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
});

export default Profile;