import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import AddTaskScreen from '../screens/AddTaskScreen';

const CARD_WIDTH = Dimensions.get('window').width*0.32;

interface CoffeeCardProp {
  taskId: string;
  name: string;
  course: string;
  priority: string;
  dueDate: string;
  onPressHandler?: any;
}

const TaskCard: React.FC<CoffeeCardProp> = ({taskId, name, course, priority, dueDate, onPressHandler}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardName}>
        <Text style={styles.textName}>
          {name}
        </Text>
      </View>

      <View style={styles.cardCourse}>
        <Text style={styles.textCourse}>
          {course}
        </Text>
      </View>

      <View style={styles.cardDue}>
        <Text style={styles.textDue}>
          {dueDate}
        </Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  cardName: {},
  cardCourse: {},
  cardDue: {},
  textName: {},
  textCourse: {},
  textDue: {},
});

export default TaskCard;
