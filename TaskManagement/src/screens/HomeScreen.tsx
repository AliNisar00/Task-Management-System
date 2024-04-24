import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Button } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { FlatList } from 'react-native-gesture-handler';
import TaskCard from '../components/TaskCard';

const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={'black'} />
            <HeaderBar title='Home' />

            {/* Task Flatlist */}
            {/*<FlatList showsVerticalScrollIndicator={false} data={}></FlatList>*/}
            <TaskCard taskId={'1'} name={'Essay 2'} course={'Hikmah'} priority={'H'} dueDate={'April 30, 2024'}></TaskCard>
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
