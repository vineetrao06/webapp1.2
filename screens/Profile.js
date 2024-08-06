// Profile.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const Profile = () => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const picture = localStorage.getItem('picture');

    const { colors } = useTheme();

    console.log(picture)

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Image source={{ uri: picture }} style={styles.profilePicture} />
            <Text style={[styles.name, {color: colors.onPrimary}]}>{name}</Text>
            <Text style={styles.email}>{email}</Text>

            <View style={styles.flexFiller}></View>
        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
    },
    flexFiller: {
        paddingBottom: 1000,
    },
});

export default Profile;
