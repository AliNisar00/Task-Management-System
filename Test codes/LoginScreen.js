// LoginScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Title, Subheading } from "react-native-paper";
import Video from 'react-native-video';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Video>
                source = {require('../assets/studentBroll.mp4')}
                style = {styles.backgroundVideo}
                volume = {1.0}
                muted = {true}
                resizeMode = {'cover'}
                rate = {1.0}
                repeat
                ignoreSilentSwitch = {'obey'}
            </Video>

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
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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
