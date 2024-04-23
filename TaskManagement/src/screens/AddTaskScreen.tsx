import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';

const AddTaskScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={'black'} />
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>Add Task</Text>
      </View>
      <ScrollView contentContainerStyle={styles.ScrollViewFlex} />
    </View>
  )
};

const styles = StyleSheet.create({
  ScreenContainer: {
      flex: 1,
      backgroundColor: 'black',
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  HeaderContainer: {
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default AddTaskScreen;
