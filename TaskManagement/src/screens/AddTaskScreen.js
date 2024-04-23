import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AddTaskScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
      <Text>AddTaskScreen</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  ScreenContainer: {
      flex: 1,
      backgroundColor: 'black',
  },
});

export default AddTaskScreen;
