import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const HowItWorksScreen = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.heading, { color: colors.primary }]}>Heading 1</Text>
            <Text style={styles.paragraph}>This is some placeholder text for Heading 1.</Text>

            <Text style={[styles.heading, { color: colors.[accent] }]}>Heading 2</Text>
            <Text style={styles.paragraph}>This is some placeholder text for Heading 2.</Text>

            <Text style={[styles.heading, { color: colors.text }]}>Heading 3</Text>
            <Text style={styles.paragraph}>This is some placeholder text for Heading 3.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 16,
    },
});

export default HowItWorksScreen;