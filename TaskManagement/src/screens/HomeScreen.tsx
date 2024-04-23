import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import HeaderBar from '../components/HeaderBar';

const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.ScreenContainer}>
            <Text>HomeScreen</Text>
            <HeaderBar />
        </View>
    )
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
});

export default HomeScreen;
