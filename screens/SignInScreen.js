import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-native';
import { jwtDecode } from "jwt-decode";
import { useTheme } from 'react-native-paper'; // Import React Native Paper components


const SignInScreen = ({ onLogin }) => {
    const navigate = useNavigate();
    const { colors } = useTheme(); // Access theme colors


    // This function is called when the login is successful
    const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);
        Alert.alert('Login Success', 'You have successfully logged in.');

        const decodedResponse = jwtDecode(response.credential)
        const name = decodedResponse.name
        const picture = decodedResponse.picture
        const email = decodedResponse.email

        console.log(decodedResponse)

        localStorage.setItem('name', name);
        localStorage.setItem('picture', picture);
        localStorage.setItem('email', email);



        onLogin(); // Update authentication state
        navigate('/'); // Redirect to home page
    };

    // This function is called when the login fails
    const handleLoginFailure = (error) => {
        console.error('Login Failed:', error);
        Alert.alert('Login Failed', 'Login failed. Please try again.');
    };

    // This function handles the button click to initiate login
    const handleButtonClick = (renderProps) => {
        console.log('Button Clicked');
        renderProps.onClick();
    };

    return (
        <View style={[{ backgroundColor: colors.background }]}>
            <GoogleOAuthProvider clientId="479283790787-gcn4ulm531l0i4cbdfu9sep0rm5q2edj.apps.googleusercontent.com">
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.primary }]}>Sign in with Google</Text>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginFailure}
                        render={(renderProps) => (
                            <Button
                                title="Sign in with Google"
                                onPress={() => handleButtonClick(renderProps)}
                                disabled={renderProps.disabled}
                            />
                        )}
                    />
                </View>
            </GoogleOAuthProvider>
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
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        paddingTop: 20,
        fontWeight: 'bold',
    },
    flexFiller: {
        paddingBottom: 1000,
    },
});

export default SignInScreen;
