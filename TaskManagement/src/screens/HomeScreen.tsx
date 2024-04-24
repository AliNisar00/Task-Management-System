import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Button } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { FlatList } from 'react-native-gesture-handler';
import TaskCard from '../components/TaskCard';

const HomeScreen = ({ navigation }) => {
    const tasks = [
        { name: 'Essay 2', course: 'Hikmah', dueDate: 'April 30, 2024', priority: 'H' },
        { name: 'Complete Math Assignment', course: 'Mathematics', dueDate: 'April 30, 2024', priority: 'M' },
        { name: 'Read Chapter 5', course: 'History', dueDate: 'May 5, 2024', priority: 'L' },
        { name: 'Essay 2', course: 'Hikmah', dueDate: 'April 30, 2024', priority: 'H' },
        { name: 'Complete Math Assignment', course: 'Mathematics', dueDate: 'April 30, 2024', priority: 'M' },
        { name: 'Read Chapter 5', course: 'History', dueDate: 'May 5, 2024', priority: 'L' },
        { name: 'Essay 2', course: 'Hikmah', dueDate: 'April 30, 2024', priority: 'H' },
        { name: 'Complete Math Assignment', course: 'Mathematics', dueDate: 'April 30, 2024', priority: 'M' },
        { name: 'Read Chapter 5', course: 'History', dueDate: 'May 5, 2024', priority: 'L' },
    ];

    return(
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={'black'} />
            <HeaderBar title='Home' />

            {/* Task Flatlist */}
            {/*<FlatList showsVerticalScrollIndicator={false} data={}></FlatList>*/}
            {/*<TaskCard taskId={'1'} name={'Essay 2'} course={'Hikmah'} priority={'H'} dueDate={'April 30, 2024'}></TaskCard>*/}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {tasks.map((task, index) => (
                <TaskCard key={index} task={task} />
                ))}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
});

export default HomeScreen;
