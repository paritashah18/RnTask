import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';
import Event from '../screens/Home/Event';
import Login from '../screens/Login';

const Stack = createStackNavigator();

const Auth = () => {
  const [isUser, setIsUser] = useState(null); 

  useEffect(() => {
    const checkUser = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        setIsUser(!!accessToken); 
      } catch (error) {
        console.log('Failed to load user:', error);
        setIsUser(false); 
      }
    };

    checkUser();
  }, []);

  if (isUser === null) {
    // While checking AsyncStorage, return empty screen or loader
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isUser ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Auth;
