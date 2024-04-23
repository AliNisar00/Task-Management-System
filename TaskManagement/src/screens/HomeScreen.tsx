import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.ScreenContainer}>
            <Text>HomeScreen</Text>
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
