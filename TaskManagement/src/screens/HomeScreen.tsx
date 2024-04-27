import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import TaskCard from '../components/TaskCard';

const HomeScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchTasks();
        //const interval = setInterval(fetchTasks, 3000); // Fetch tasks every 3 seconds
        //return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    const onRefresh = () => {
        setRefreshing(true); // Set refreshing to true when the user pulls down to refresh
        fetchTasks(); // Fetch tasks when the user pulls down to refresh
    };

    const fetchTasks = async () => {
        setLoading(true);
        try {
            
            //const response = await fetch('http://10.20.5.58:5000/homepage/660e88ce1d3eba857b420554', { // local device - ERROR
            const response = await fetch('http://10.0.2.2:5000/homepage/660e88ce1d3eba857b420554', { // android emulator
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();

            //console.log(data);

            const processedTasks = data.map(task => ({
                taskId: task._id.$oid,
                name: task.task_name,
                course: task.task_course,
                dueDate: task.task_duedate,
                priority: task.task_priority
            }));
            setTasks(processedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            // Handle error, show message to user
        } finally {
            setLoading(false);
            setRefreshing(false); // Set refreshing to false when fetch is complete
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'black'} />
            <HeaderBar title='Home' />

            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#5D3FD3']}
                        tintColor={'#5D3FD3'}
                    />
                }
            >

            {loading ? (
                <ActivityIndicator size="large" color="#5D3FD3" />
            ) : (
                <View>
                    {tasks.map((task, index) => (
                        <TaskCard key={index} task={task} />
                    ))}
                    {/* Additional padding at the bottom to avoid overlap with tab navigator */}
                    <View style={styles.bottomPadding} />
                </View>
            )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    bottomPadding: {
        height: 50,
    },
});

export default HomeScreen;
