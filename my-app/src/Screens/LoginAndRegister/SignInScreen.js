import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { ShowToast } from '../../components/Toast.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignIn = () => {

    ShowToast('info', 'Processing your sign-in...');
    axios.post('http://192.168.225.103:5001/login-user', { email, password })
      .then((res) => {
        if (res.data.message === "User doesn't exists!!") {
          ShowToast('error', "couldn't Login");
        } 
        else {          
          ShowToast('success', "Welcome!!");
          AsyncStorage.setItem("token",res.data.data)
          AsyncStorage.setItem('isLoggedIn',JSON.stringify(true))
          navigation.navigate('Home');
        }
      })
      .catch((err) => {
        ShowToast('error', "ERROR has occurred");
      });
  };

  const handleSignUpNavigation = () => {
    navigation.navigate('SignUp'); // Navigate to the SignUp screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <Image source={require('../../../assets/7.jpg')} style={styles.image} />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.emailInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        {/* Add the SignUp navigation text */}
        <TouchableOpacity onPress={handleSignUpNavigation} style={styles.signUpWrapper}>
          <Text>Don't have an account? <Text>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  formWrapper: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 20, 
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
    fontWeight: 'bold',
    width: '100%',
  },
  emailInput: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
    width: '100%',
    color: 'black',
    text:"bold"
  },
  passwordInput: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
    width: '100%',
    color: '#05375a',
  },
  signInButton: {
    width: '70%',
    backgroundColor: '#420475',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 16,
  },
  signInText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  signUpWrapper: {
    marginTop: 20,
  },


});
