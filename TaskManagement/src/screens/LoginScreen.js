// LoginScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Title, Subheading } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Title style={styles.title}>Welcome to FitTrack</Title>
                <Subheading style={styles.subtitle}>Your personal fitness companion</Subheading>

                {/* Add any login or authentication components here */}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('AccountLogin')}
                    style={styles.button}
                >
                    Login
                </Button>

                <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('AccountSignup')}
                    style={styles.button}
                >
                    Sign Up
                </Button>
            </View>
        </View>
    );
};

/*
LoginScreen.navigationOptions = {
    headerShown: false,
};
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', // Set background color to black
        padding: 16,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'white', // Set text color to white
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 32,
    },
    buttonContainer: {
        width: '100%',
    },
    button: {
        marginVertical: 8,
    },
});

export default LoginScreen;
