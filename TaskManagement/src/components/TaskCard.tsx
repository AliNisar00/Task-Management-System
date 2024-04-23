import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const CARD_WIDTH = Dimensions.get('window').width*0.32;

interface CoffeeCardProp {
  id: string;
  name: string;
  course: string;
  priority: string;
  dueDate: string;
  onPressHandler: any;
}

const TaskCard: React.FC<CoffeeCardProp> = ({id, name, course, priority, dueDate, onPressHandler}) => {
  return (
    <View>
      <Text>TaskCard</Text>
    </View>
  )
};

const styles = StyleSheet.create({});

export default TaskCard;