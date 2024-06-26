import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen'
import AccountLogin from './src/screens/AccountLoginScreen';
import AccountSignup from './src/screens/AccountSignupScreen';
import AccountForgetPassword from './src/screens/AccountForgetPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import TabNavigator from './src/navigators/TabNavigator';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName={"Login"} screenOptions={ {headerShown: false} }>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AccountLogin" component={AccountLogin} />
      <Stack.Screen name="AccountSignup" component={AccountSignup} />
      <Stack.Screen name="AccountForgetPassword" component={AccountForgetPassword} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
