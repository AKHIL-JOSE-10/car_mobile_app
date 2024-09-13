import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SignUpScreen from './src/Screens/LoginAndRegister/SignUpScreen';
import SignInScreen from './src/Screens/LoginAndRegister/SignInScreen.js';
import { Home } from './src/Screens/Home';
import ProfileScreen from './src/Screens/Profile.js';
import NotificationScreen from './src/Screens/NotificationScreen.js';
import Toast from 'react-native-toast-message'; // Import Toast
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import DrawerContent from './DrawerContent.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: 'purple',
      },
      headerTintColor: 'white',
      headerTitleAlign: 'center',
    }}>
      <Stack.Screen name="Home" component={Home} options={{
        headerLeft: () => (
          <Icon
            name="menu"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            size={30}
            color="white"
          />
        )
      }} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{
      headerShown: false
    }}>
      <Drawer.Screen name='Home' component={StackNav} />
    </Drawer.Navigator>
  );
};

const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'purple',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="SignIn" options={{ title: 'CarApp' }} component={SignInScreen} />
      <Stack.Screen name="SignUp" options={{ title: 'CarApp' }} component={SignUpScreen} />
      <Stack.Screen name="Home" options={{ headerShown: false }} component={DrawerNav} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data);
    setIsLoggedIn(data === 'true'); // Ensure isLoggedIn is a boolean
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNav /> : <LoginNav />}
      <Toast />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default App;
