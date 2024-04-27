import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

const TaskCard = ({ task }) => {
  const [isVisible, setIsVisible] = useState(false);

  const deleteTask = async (taskId) => {
    try {
      const baseUrl = "http://10.0.2.2:5000/tasks/";
      const callUrl = baseUrl + taskId
      //console.log('http://10.0.2.2:5000/tasks/${taskId}')
      const response = await fetch(callUrl, { // original: 192.168.18.77
      method: 'DELETE',
    });

    } catch (error) {
    console.error('Error fetching tasks:', error);
    // Handle error, show message to user
    } finally {
    
    }
  };

  // Determine the color based on the priority
  let priorityColor;
  switch (task.priority) {
    case 'H':
      priorityColor = 'red'; // Blood red
      break;
    case 'M':
      priorityColor = 'orange';
      break;
    case 'L':
      priorityColor = 'blue';
      break;
    default:
      priorityColor = 'transparent'; // Default to transparent if priority is not recognized
  }

  return (
    <LongPressGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          // Long press detected, show menu
          console.log('Long press detected');
          setIsVisible(true);
        }
      }}
    >
      <View>
      <LinearGradient
        colors={['#0a0a2a', '#222244']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Priority indicator */}
        {task.priority && (
          <View style={[styles.priorityIndicator, { backgroundColor: priorityColor }]} />
        )}

        {/* Task information */}
        <View style={styles.textContainer}>
          <Text style={styles.taskName}>{task.name}</Text>
          <Text style={styles.course}>{task.course}</Text>
          <Text style={styles.dueDate}>Due: {task.dueDate}</Text>
        </View>
      </LinearGradient>

      <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          //onRequestClose={false/*handleCloseMenu*/}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Button title="Mark as complete" />
              <Button title="Delete this task" onPress={() => deleteTask(task.taskId)} />
              <Button title="Cancel" onPress={() => setIsVisible(false)} />
            </View>
          </View>
      </Modal>
    </View>
  </LongPressGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginRight: 10, // Space on the right
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Center children vertically
  },
  priorityIndicator: {
    width: 5,
    height: '100%', // Take full height of the card
    backgroundColor: 'red', // Default color (will be overridden based on priority)
    borderRadius: 5,
    marginRight: 10, // Space between the indicator and text
  },
  textContainer: {
    flex: 1, // Take remaining space
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white', // Ensuring text is visible on the gradient background
  },
  course: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white', // Ensuring text is visible on the gradient background
  },
  dueDate: {
    fontSize: 14,
    color: 'white', // Ensuring text is visible on the gradient background
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});

export default TaskCard;
