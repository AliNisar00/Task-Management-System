import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Button } from 'react-native';
import HeaderBar from '../components/HeaderBar';

const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={'black'} />
            <HeaderBar title='Home' />
            <ScrollView contentContainerStyle={styles.ScrollViewFlex} />
        </View>
    )
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
});

export default HomeScreen;
