import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-native';
import { jwtDecode } from 'jwt-decode';
import { useTheme, Button as PaperButton } from 'react-native-paper';

const SignInScreen = ({ onLogin }) => {
    const navigate = useNavigate();
    const { colors } = useTheme();
    const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
    const [userType, setUserType] = useState('');

    const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);
        Alert.alert('Login Success', 'You have successfully logged in.');

        try {
            const decodedResponse = jwtDecode(response.credential);
            const name = decodedResponse.name;
            const picture = decodedResponse.picture;
            const email = decodedResponse.email;
            const userID = decodedResponse.sub;

            const userDetails = {
                ...decodedResponse,
                userType: userType
            };

            console.log(userDetails);

            // Store user info including type
            localStorage.setItem('name', name);
            localStorage.setItem('picture', picture);
            localStorage.setItem('email', email);
            localStorage.setItem('userType', userType);
            localStorage.setItem('userID', userID);

            // Check if it's the user's first time logging in by using their email
            const firstTimeUserKey = `firstTimeUser_${email}`;
            const firstTimeUser = localStorage.getItem(firstTimeUserKey) === null;

            // if (firstTimeUser) {
            //     console.log('This is the user\'s first time logging in.');
            //     // Set the flag to indicate that the user has logged in before
            //     localStorage.setItem(firstTimeUserKey, 'false');

            //     if (userType === 'Influencer') {
            //         navigate('/influencer-survey'); // Pass onLogin to SurveyScreen
            //     } else {
            //         navigate('/song-artist-survey'); // this means user is a song artist
            //     }
            // } else {
            //     console.log('This is not the user\'s first time logging in.');
            //     onLogin();
            //     navigate('/'); // Redirect to home page for existing users
            // }

            // ! DEBUGGING
            if (userType === 'Influencer') {
                navigate('/influencer-survey'); // Pass onLogin to SurveyScreen
            } else {
                navigate('/song-artist-survey'); // this means user is a song artist
            }

        } catch (error) {
            console.error('Token decoding failed:', error);
            Alert.alert('Error', 'Failed to decode token.');
        }
    };

    const handleLoginFailure = (error) => {
        console.error('Login Failed:', error);
        Alert.alert('Login Failed', 'Login failed. Please try again.');
    };

    const handleButtonClick = (renderProps) => {
        if (renderProps.disabled) {
            return;
        }
        renderProps.onClick();
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: colors.background,
        },
        innerContainer: {
            alignItems: 'center',
        },
        title: {
            fontSize: 24,
            marginBottom: 50,
            textAlign: "center",
            paddingTop: 20,
            fontWeight: 'bold',
            color: colors.onPrimary,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '101%',
            paddingTop: 30,
        },
        button: {
            marginHorizontal: 20,
            flex: 1,
        },
        flexFiller: {
            paddingBottom: 1000,
        },
    });

    return (
        <View style={styles.container}>
            <GoogleOAuthProvider clientId="479283790787-gcn4ulm531l0i4cbdfu9sep0rm5q2edj.apps.googleusercontent.com">
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Sign in / Sign up</Text>
                    {!showGoogleSignIn ? (
                        <View style={styles.buttonContainer}>
                            <PaperButton
                                mode="contained"
                                style={styles.button}
                                onPress={() => {
                                    setUserType('Song Artist');
                                    setShowGoogleSignIn(true);
                                }}
                            >
                                As a Song Artist
                            </PaperButton>
                            <PaperButton
                                mode="contained"
                                style={styles.button}
                                onPress={() => {
                                    setUserType('Influencer');
                                    setShowGoogleSignIn(true);
                                }}
                            >
                                As an Influencer
                            </PaperButton>
                        </View>
                    ) : (
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                            render={(renderProps) => (
                                <PaperButton
                                    mode="contained"
                                    style={styles.button}
                                    onPress={() => handleButtonClick(renderProps)}
                                    disabled={renderProps.disabled}
                                >
                                    Sign in with Google
                                </PaperButton>
                            )}
                        />
                    )}
                </View>
            </GoogleOAuthProvider>
            <View style={styles.flexFiller}></View>
        </View>
    );
};

export default SignInScreen;