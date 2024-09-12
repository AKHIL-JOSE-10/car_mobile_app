import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { ShowToast } from '../../components/Toast.js';
// import { useNavigation } from '@react-navigation/native';

// const navigation = useNavigation();

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    ShowToast('info', 'Processing your sign-up...');
    axios.post('http://192.168.225.103:5001/register', { email, password })
      .then((res) => {
        if (res.data.status === "ok") {
          ShowToast('success', res.data.data);
        } else {
          ShowToast('error', res.data.message);
        }
      })
      .catch((err) => {
        ShowToast('error', "ERROR has occurred");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/6.jpg')} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    borderColor: '#420475',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
    color: '#05375a',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  signUpButton: {
    width: '70%',
    backgroundColor: '#420475',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SignUpScreen;
