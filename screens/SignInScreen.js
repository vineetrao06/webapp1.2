import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-native';
import { jwtDecode } from "jwt-decode";


const SignInScreen = ({ onLogin }) => {
    const navigate = useNavigate();

    // This function is called when the login is successful
    const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);
        Alert.alert('Login Success', 'You have successfully logged in.');

        const decodedResponse = jwtDecode(response.credential)
        const nameOfUser = decodedResponse.name

        localStorage.setItem('name', nameOfUser);


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
        <GoogleOAuthProvider clientId="479283790787-gcn4ulm531l0i4cbdfu9sep0rm5q2edj.apps.googleusercontent.com">
            <View style={styles.container}>
                <Text style={styles.title}>Sign in with Google</Text>
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
});

export default SignInScreen;
