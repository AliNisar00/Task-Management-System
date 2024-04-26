import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Button, Text, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

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
        <View style={styles.inputContainer}>
          <Text>Priority</Text>
          <RNPickerSelect
            value={priority}
            onValueChange={(value) => setPriority(value)}
            items={[
              { label: 'Priority: High', value: 'H' },
              { label: 'Priority: Medium', value: 'M' },
              { label: 'Priority: Low', value: 'L' },
            ]}
            placeholder={{}}
            style={{
              inputIOS: {
                ...styles.input,
                ...styles.greyText,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#fff',
                borderRadius: 5,
              },
              inputAndroid: {
                ...styles.input,
                ...styles.greyText,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#fff',
                borderRadius: 5,
              },
              iconContainer: {
                top: 10,
                right: 12,
              },
              placeholder: {
                color: '#999',
              },
            }}
            useNativeAndroidPickerStyle={false}
          />
        </View>
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
  inputContainer: {
    marginBottom: 10,
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
  greyText: {
    color: 'grey',
  },
});

export default AddTaskScreen;
