import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TaskCard = ({ task, priority }) => {
  // Determine the color based on the priority
  let priorityColor;
  switch (priority) {
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
    <LinearGradient
      colors={['#0a0a2a', '#222244']}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Priority indicator */}
      {priority && (
        <View style={[styles.priorityIndicator, { backgroundColor: priorityColor }]} />
      )}

      {/* Task information */}
      <View style={styles.textContainer}>
        <Text style={styles.taskName}>{task.name}</Text>
        <Text style={styles.course}>{task.course}</Text>
        <Text style={styles.dueDate}>Due: {task.dueDate}</Text>
      </View>
    </LinearGradient>
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
});

export default TaskCard;
