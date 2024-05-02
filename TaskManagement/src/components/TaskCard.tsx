import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

const TaskCard = ({ task }) => {
  const [isVisible, setIsVisible] = useState(false);

  const deleteTask = async (taskId) => {
    try {
      const baseUrl = "http://10.0.2.2:5000/tasks/";
      const callUrl = baseUrl + taskId;
      const response = await fetch(callUrl, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsVisible(false);
    }
  };

  // Calculate remaining hours
  //const dueDate = new Date(task.dueDate);
  //const currentDate = new Date();
  //const diffInMs = dueDate - currentDate;
  //const remainingHours = Math.ceil(diffInMs / (1000 * 60 * 60));
  const remainingHours = task.estTime;

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
          {task.priority && (
            <View style={[styles.priorityIndicator, { backgroundColor: priorityColor }]} />
          )}

          <View style={styles.textContainer}>
            <Text style={styles.taskName}>{task.name}</Text>
            <Text style={styles.course}>{task.course}</Text>
            <Text style={styles.dueDate}>Due: {task.dueDate}</Text>
          </View>

          <View style={styles.remainingHoursContainer}>
            <Text style={styles.remainingHoursLabel}>Est. time required</Text>
            <Text style={styles.remainingHours}>{remainingHours}h</Text>
          </View>
        </LinearGradient>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Button title="Mark as complete" onPress={() => deleteTask(task.taskId)} />
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
  remainingHoursContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  remainingHoursLabel: {
    fontSize: 12,
    color: 'white',
    marginBottom: 2,
  },
  remainingHours: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TaskCard;
