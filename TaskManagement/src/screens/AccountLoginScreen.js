import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Title, TextInput, Subheading, ActivityIndicator } from "react-native-paper";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      // Call your Flask API to authenticate the user
      const response = await fetch('http://192.168.18.77:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
      });

      //console.log(response.status);

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
      } else {
        // Handle authentication errors
        throw new Error(data.message || 'Sign in failed');
      }
    } catch (error) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Title style={styles.title}>Account Login</Title>
        <Subheading style={styles.subtitle}>
          Enter your email and password to log in.
        </Subheading>

        {/* Email Input */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: 'white'} }}
        />

        {/* Password Input */}
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: 'white' } }}
        />
      </View>

      { loading ? <ActivityIndicator size="large" color="#5D3FD3" /> :
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={signIn}
            style={styles.button}
          >
            Login
          </Button>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 16,
  },
  contentContainer: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    color: 'grey',
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    width: "100%"
  },
  button: {
    marginVertical: 18,
  },
});

export default AccountLoginScreen;
