import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Button, Text, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTaskScreen = () => {
  const [task, settask] = useState([]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTask = () => {
    const newTask = { name, course, dueDate: dueDate.toDateString(), priority };
    settask([...task, newTask]);
    setName('');
    setCourse('');
    setDueDate(new Date());
    setPriority('');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} />
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>Add Task</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="grey"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Course"
          placeholderTextColor="grey"
          value={course}
          onChangeText={setCourse}
        />
        <View style={styles.datePickerContainer}>
          <Button
            title="Select Due Date"
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Priority"
          value={priority}
          onChangeText={setPriority}
        />
        <Button
          title="Confirm"
          onPress={handleAddTask}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    color: '#fff',
  },
  datePickerContainer: {
    marginBottom: 10,
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
