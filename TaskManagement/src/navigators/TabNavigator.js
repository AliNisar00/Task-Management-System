import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
        /* ADD THIS CODE AFTER EJECTING TO ENABLE BLUR
        tabBarBackground: () => (
          <BlurView 
            overlayColor=''
            blurAmount={15}
            style={styles.BlurViewStyles}
          />
        ),
        */
      }}>

      <Tab.Screen name='Home' component={HomeScreen}>

      </Tab.Screen>

      <Tab.Screen name='AddTask' component={AddTaskScreen}>

      </Tab.Screen>

    </Tab.Navigator>
  )
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: 0x000000,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  }
});

export default TabNavigator;