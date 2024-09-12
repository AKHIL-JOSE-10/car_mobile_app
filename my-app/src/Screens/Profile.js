import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ProfileScreen(props) {
  return (
    <View style={profileStyles.viewStyle}>
      <Text style={profileStyles.textStyle}>Profile Information</Text>
    </View>
  );
}

const profileStyles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textStyle: {
    fontSize: 28,
    color: 'black',
  },
});

export default ProfileScreen;
