import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link, useNavigate } from 'react-router-dom'; // Ensure compatibility with react-router-dom
import { useTheme, Menu, Divider, Provider } from 'react-native-paper'; // Import useTheme and other components
import './Navbar.css'; // Import the CSS file

const Navbar = ({ isAuthenticated, onLogout }) => {
    const navigate = useNavigate();
    const { colors } = useTheme();
    const [menuVisible, setMenuVisible] = useState(false);

    const profilePicture = localStorage.getItem('picture');

    const handleProfileClick = () => {
        setMenuVisible(true);
    };

    const handleMenuClose = () => {
        setMenuVisible(false);
    };

    const handleViewProfile = () => {
        handleMenuClose();
        navigate('/profile');
    };

    const handleLogoutClick = () => {
        handleMenuClose();
        onLogout();
    };

    return (
        <Provider>
            <View style={[styles.navbar, { backgroundColor: colors.background }]}>
                <View style={styles.navLinks}>
                    <Link to="/" className="navLink" style={styles.navLink}>
                        <Text style={styles.navText}>Logo/Home</Text>
                    </Link>
                    <Link to="/top" className="navLink" style={styles.navLink}>
                        <Text style={styles.navText}>Top Songs</Text>
                    </Link>
                    <Link to="/howitworks" className="navLink" style={styles.navLink}>
                        <Text style={styles.navText}>How It Works</Text>
                    </Link>
                    <Link to="/join" className="navLink" style={styles.navLink}>
                        <Text style={styles.navText}>Join as Artist</Text>
                    </Link>
                </View>
                {isAuthenticated ? (
                    <Menu
                        visible={menuVisible}
                        onDismiss={handleMenuClose}
                        anchor={
                            <TouchableOpacity onPress={handleProfileClick} style={styles.profileContainer}>
                                <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                            </TouchableOpacity>
                        }
                        contentStyle={{ backgroundColor: colors.background }}
                    >
                        <Menu.Item onPress={handleViewProfile} title="View Profile" titleStyle={styles.menuItemText} />
                        <Divider />
                        <Menu.Item onPress={handleLogoutClick} title="Log Out" titleStyle={styles.menuItemText} />
                    </Menu>
                ) : (
                    <Link to="/signin" className="navLink" style={styles.navLink}>
                        <Text style={styles.navText}>Sign In</Text>
                    </Link>
                )}
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Adjust for spacing
        alignItems: 'center', // Align items vertically
        padding: 10,
    },
    navLinks: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1, // Take up remaining space
    },
    navLink: {
        padding: 10,
        borderRadius: 20, // Make it circular
        margin: 5, // Add some margin between circles
    },
    navText: {
        color: '#fff',
    },
    profileContainer: {
        padding: 1, // Adjust padding
        paddingRight: 30, // Adjust padding
    },
    profilePicture: {
        width: 40, // Adjusted width
        height: 40, // Adjusted height
        borderRadius: 20, // Adjusted border radius
    },
    menuItemText: {
        color: '#fff',
    },
    button: {
        padding: 10,
        backgroundColor: '#555',
    },
    buttonText: {
        color: '#fff',
    },
});

export default Navbar;
