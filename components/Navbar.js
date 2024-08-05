import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from 'react-router-dom'; // Updated to use react-router-dom

const Navbar = ({ isAuthenticated, onLogout }) => {
    let authComponent;

    if (isAuthenticated) {
        authComponent = <Button title="Logout" onPress={onLogout} />;
    } else {
        authComponent = (
            <Link to="/signin" style={styles.navLink}>
                <Text>Sign In</Text>
            </Link>
        );
    }

    return (
        <View style={styles.navbar}>
            <Link to="/" style={styles.navLink}><Text>Logo/Home</Text></Link>
            <Link to="/top" style={styles.navLink}><Text>Top Songs</Text></Link>
            <Link to="/howitworks" style={styles.navLink}><Text>How It Works</Text></Link>
            <Link to="/join" style={styles.navLink}><Text>Join as Artist</Text></Link>
            {authComponent}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#eee',
    },
    navLink: {
        padding: 10,
    },
});

export default Navbar;
