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
    <View style={styles.card}>
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
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: 350,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardName: {},
  cardCourse: {},
  cardDue: {},
  textName: {},
  textCourse: {},
  textDue: {},
});

export default TaskCard;
