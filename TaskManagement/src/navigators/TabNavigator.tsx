import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons'; // Import icons

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === 'Home') {
            icon = <FontAwesomeIcon icon={faHome} size={size} color={color} />;
          } else if (route.name === 'AddTask') {
            icon = <FontAwesomeIcon icon={faPlus} size={size} color={color} />;
          }
          return icon;
        },
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='AddTask' component={AddTaskScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: 'black',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  }
});

export default TabNavigator;
