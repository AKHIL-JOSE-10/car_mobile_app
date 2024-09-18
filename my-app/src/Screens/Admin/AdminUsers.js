import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, TouchableOpacity } from "react-native";
import axios from 'axios';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Import icons
import * as SMS from 'expo-sms'

function UserDetails({ route }) {
  const { user } = route.params;
  const [userData, setUserData] = useState(null);
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://192.168.3.103:5001/get-user-details/${user._id}`);
        setUserData(res.data.data);
        setNumber(res.data.data.mobile)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user._id]);

  const generateRandomNumber = () => {
    return Math.floor(100 + Math.random() * 900); // Generate a random 3-digit number
  };

  const sendSMS = async () => {
    const randomNumber = generateRandomNumber();
    const newPassword = `Car${randomNumber}`; // Generate new password
    const message = `Your new password is ${newPassword}`; // Message with new password
  
    try {
      // Send SMS
      await SMS.sendSMSAsync(number, message);
        // Update password on the server
        const updatePasswordResponse = await axios.post('http://192.168.3.103:5001/update-password', {
          userId: user._id,
          newPassword,
        });
  
        if (updatePasswordResponse.data.status === 'ok') {
          alert('Message sent successfully. Password updated.');
        } else {
          alert('Message sent but failed to update password.');
        }

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : (
        userData && (
          <View style={styles.card}>
            {/* User Details with Icons */}
            <View style={styles.detailRow}>
              <MaterialIcons name="person" size={21} color="#6200EE" style={styles.icon} />
              <Text style={styles.detailText}>{userData.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="email" size={21} color="#6200EE" style={styles.icon} />
              <Text style={styles.detailText}>{userData.email}</Text>
            </View>
            <View style={styles.detailRow}>
              <FontAwesome name="phone" size={21} color="#6200EE" style={styles.icon} />
              <Text style={styles.detailText}>{userData.mobile}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={sendSMS}>
              <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0FE', // Light blue gradient background
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'flex-start',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, // Spacing between details
    paddingVertical: 12, // Padding around each detail
    borderBottomWidth: 1,
    borderBottomColor: '#DDD', // Light grey border for separation
    width: '100%',
  },
  icon: {
    backgroundColor: '#6200EE', // Soft background color for icons
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    textAlign: 'center',
    overflow: 'hidden',
    color:'white'
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6200EE',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserDetails;
