import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import SongCard from './SongCard'; // Adjust path if necessary

const SongCardContainer = ({ songs }) => {
    const { colors } = useTheme();

    // Function to render each item in the FlatList
    const renderItem = ({ item }) => (
        <SongCard song={item} />
    );

    return (
        <FlatList
            data={songs}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            numColumns={4} // Set the number of columns to 4
            columnWrapperStyle={styles.row} // Apply styles to the row
            contentContainerStyle={{ backgroundColor: colors.background }}
        />
    );
};

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between', // Ensure space between cards
        marginBottom: 20,
    },
});

export default SongCardContainer;