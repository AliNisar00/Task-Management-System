import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Button, Text, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import Toast, { SuccessToast } from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskScreen = ({ navigation }) => {
  
  const addTask = async (task) => {
    if (essayPrompt == '') {
      throw new Error('Error: Prompt missing')
    }

    try {
      const userID = await AsyncStorage.getItem('userID');

      const response = await fetch('http://10.0.2.2:5000/tasks/' + userID, { // original: 192.168.18.77
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_name: task[0]?.name, task_course: task[0]?.course, task_duedate: task[0]?.dueDate, task_priority: task[0]?.priority, task_prompt: task[0]?.essayPrompt }),
      });

      console.log(task[0])

      // Handle the response from your Flask API
      const data = await response.json();
      if (response.status == 200) {
        // Show a toast notification after successful login
        Toast.show({
          type: 'success',
          text1: 'Logged in',
        });
  
        // Navigate to TabNavigator upon successful login
        navigation.navigate('Home', { userName: data.userName });
      // Handle authentication errors
      } else if (response.status == 400) {
        throw new Error(data.message || 'Task name, course, due date, and priority are required');
      } else {
        throw new Error(data.message || 'Unknown error');
      }

    } catch (message) {
      console.log(message);
      alert(message.message);
      navigation.navigate('Home')
    } finally {
      
    }
  }

  const [task, settask] = useState([]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState('H');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [essayPrompt, setEssayPrompt] = useState('');

  //console.log(task[0].Priority)

  const handleAddTask = () => {
    
    const newTask = { name, course, dueDate: dueDate.toDateString(), priority, essayPrompt };
    settask([newTask]);
    setName('');
    setCourse('');
    setDueDate(new Date());
    setPriority('');
    setEssayPrompt('');

    //console.log(task);
    //console.log(task[0]["name"])

    addTask([newTask]);
    //console.log(task)

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
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          style={styles.input}
          placeholder="Course"
          placeholderTextColor="grey"
          value={course}
          onChangeText={(course) => setCourse(course)}
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
            items={[
              { label: 'Priority: High', value: 'H' },
              { label: 'Priority: Medium', value: 'M' },
              { label: 'Priority: Low', value: 'L' },
            ]}
            value={priority}
            onValueChange={(value) => setPriority(value)}
            placeholder={{}}
            style={{
              inputIOS: {
                ...styles.input,
                ...styles.whiteText,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#fff',
                borderRadius: 10,
                paddingRight: 30,
              },
              inputAndroid: {
                ...styles.input,
                ...styles.whiteText,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#fff',
                borderRadius: 10,
                paddingRight: 30,
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
          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faCaretDown} size={18} color="#fff" />
          </View>
        </View>
        <TextInput
          style={styles.essayInput}
          placeholder="Enter prompt"
          placeholderTextColor="grey"
          multiline={true}
          numberOfLines={8} // Set the number of lines to determine the initial height        
          value={essayPrompt}
          onChangeText={(essayPrompt) => setEssayPrompt(essayPrompt)}
        />
        <Button
          title="Add Task"
          onPress={handleAddTask}
        />
      </ScrollView>
      <View style={styles.bottomPadding} />
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
    borderRadius: 10,
    padding: 10,
    color: '#fff',
  },
  essayInput: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
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
  whiteText: {
    color: 'white',
  },
  iconContainer: {
    position: 'absolute',
    top: '45%',
    right: 16,
    //transform: [{ translateY: -9 }], // Center the icon vertically
  },
  bottomPadding: {
    height: 60,
  },
});

export default AddTaskScreen;
