import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { ShowToast } from '../../components/Toast.js';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    ShowToast('info', 'Processing your sign-up...');
    axios.post('http://192.168.225.103:5001/register', { name, email, mobile, password })
      .then((res) => {
        if (res.data.status === "ok") {
          ShowToast('success', res.data.data);
          // Navigate to SignIn screen after successful sign-up
          navigation.navigate('SignIn');
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
      <View style={styles.formWrapper}>
        <Image source={require('../../../assets/6.jpg')} style={styles.image} />
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter your name"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.textInput}
          value={mobile}
          onChangeText={(text) => setMobile(text)}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signInRedirectContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text>Have an account? <Text style={styles.redirectButton}>Sign In</Text></Text>
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
  textInput: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
    width: '100%',
    color: 'black',
  },
  signUpButton: {
    width: '70%',
    backgroundColor: '#420475',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  signInRedirectContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  redirectButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#420475',
    marginLeft: 5,
  },
});

export default SignUpScreen;
