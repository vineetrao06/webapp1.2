import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Link, useNavigate } from 'react-router-dom'; // Ensure compatibility with react-router-dom
import { useTheme, Menu, Divider, Provider } from 'react-native-paper'; // Import useTheme and other components
import { MaterialIcons } from '@expo/vector-icons'; // Import Material Icons for dropdown arrow
import './Navbar.css'; // Import the CSS file

const Navbar = ({ isAuthenticated, onLogout }) => {
    const navigate = useNavigate();
    const { colors } = useTheme();
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const profilePicture = localStorage.getItem('picture');
    const fullName = localStorage.getItem('name');
    const firstName = fullName ? fullName.split(' ')[0] : '';

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

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const handleSearchSubmit = () => {
        navigate(`/search?query=${searchQuery}`);
    };

    return (
        <Provider>
            <View style={[styles.navbar, { backgroundColor: colors.background }]}>
                <View style={styles.navLinksContainer}>
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
                        <Link to="/join" className="navLink artist" style={styles.navLink}>
                            <Text style={styles.navText}>Join as Artist</Text>
                        </Link>
                    </View>
                </View>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    onSubmitEditing={handleSearchSubmit}
                />
                {isAuthenticated ? (
                    <Menu
                        visible={menuVisible}
                        onDismiss={handleMenuClose}
                        anchor={
                            <TouchableOpacity onPress={handleProfileClick} style={styles.profileContainer}>
                                <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                                <Text style={styles.userName}>{firstName}</Text>
                                <MaterialIcons name="arrow-drop-down" size={24} color="#fff" />
                            </TouchableOpacity>
                        }
                        contentStyle={{ backgroundColor: colors.background }}
                    >
                        <Menu.Item onPress={handleViewProfile} title="View Profile" titleStyle={styles.menuItemText} style={styles.menuItem} />
                        <Divider />
                        <Menu.Item onPress={handleLogoutClick} title="Log Out" titleStyle={styles.menuItemText} style={styles.menuItem} />
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
        // alignItems: 'center', // Align items vertically
        padding: 10,
        position: 'relative', // or 'fixed' if you want it always visible on top
        zIndex: 1000, // High zIndex to ensure it's on top
    },
    navLinksContainer: {
        flex: 1,
        alignItems: 'flex-start', // Align items to the left
        paddingRight: 50,
        marginLeft: 70
    },
    navLinks: {
        flexDirection: 'row',
    },
    navLink: {
        padding: 10,
        borderRadius: 20, // Make it circular
        margin: 5, // Add some margin between circles
    },
    navText: {
        color: '#fff',
    },
    searchBar: {
        width: '45%', // Adjusted to half its original width
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        color: '#fff',
        marginHorizontal: 10,
    },
    artist: {
        paddingRight: 10    ,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically
        padding: 1, // Adjust padding
        paddingRight: 30, // Adjust padding
        marginRight: 70, // Add margin to the right
        borderRadius: 10, // Adjust border radius accordingly
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Add a semi-transparent background for better visibility
    },
    profilePicture: {
        width: 40, // Adjusted width
        height: 40, // Adjusted height
        borderRadius: 20, // Adjusted border radius
    },
    userName: {
        color: '#fff',
        marginLeft: 5, // Adjust margin accordingly
    },
    menuItemText: {
        color: '#fff',
    },
    menuItem: {
        height: 25, // Adjust the height to fit within the navbar height
        justifyContent: 'center', // Center the text vertically
    },
    button: {
        padding: 10,
        backgroundColor: '#555',
    },
    buttonText: {
        color: '#fff',
    },
    menu: {
        marginTop: 25, // Adjust this value to ensure the menu is fully visible
        zIndex: 1000, // Ensure the menu is on top
    },
});

export default Navbar;
