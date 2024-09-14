import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowToast } from '../components/Toast.js';
import { useNavigation } from '@react-navigation/native';

function ProfileScreen(props) {
  const [userData, setUserData] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('*******');
  const [mobile, setMobile] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Update individual states when userData changes
    if (userData) {
      setName(userData.name || '');
      setEmail(userData.email || '');
      setPassword('*******');
      setMobile(userData.mobile || '')
    }
  }, [userData]);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post('http://192.168.225.103:5001/userdata', { token: token });
      setUserData(res.data.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleUpdate = () => {

    axios.post('http://192.168.225.103:5001/updateuser', { name, email, password, mobile })
      .then((res) => {
        ShowToast('success', "Profile updated successfully!");
        navigation.navigate('Home');
      })
      .catch((err) => {
        ShowToast('error', "Couldnt update the Profile");
      });
  };

  return (
    <View style={profileStyles.profileContainer}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOK_bYaHApfSgOyEnMnpx9T3Kc_CjvFzaydg&s" }}
            style={profileStyles.profileImage}
          />
        </View>

        {/* Name field */}
        <View style={profileStyles.inputGroup}>
          <Text style={profileStyles.label}>Name:</Text>
          <TextInput
            style={profileStyles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        {/* Email field */}
        <View style={profileStyles.inputGroup}>
          <Text style={profileStyles.label}>Email:</Text>
          <TextInput
            style={profileStyles.inputBox}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Password field */}
        <View style={profileStyles.inputGroup}>
          <Text style={profileStyles.label}>Password:</Text>
          <TextInput
            style={profileStyles.inputBox}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true} // Make the input secure for passwords
          />
        </View>


        {/* mobile field */}
        <View style={profileStyles.inputGroup}>
          <Text style={profileStyles.label}>Mobile:</Text>
          <TextInput
            style={profileStyles.inputBox}
            value={mobile}
            onChangeText={(text) => setMobile(text)}
          />
        </View>

        {/* Update Button */}
        <TouchableOpacity style={profileStyles.updateButton} onPress={handleUpdate}>
          <Text style={profileStyles.buttonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const profileStyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    margin: 20,
    marginTop: 1,
    justifyContent: 'center', // Center vertically
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: 16,
    marginBottom: 6,
  },
  inputBox: {
    backgroundColor: "#f0f0f0",
    fontSize: 16,
    borderRadius: 5,
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
    paddingLeft: 10
  },
  updateButton: {
    width: '70%',
    backgroundColor: 'purple',  // Deep purple for a sleek modern look
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: 'center',
    shadowColor: "#6200EE",      // Adding button shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});


export default ProfileScreen;
