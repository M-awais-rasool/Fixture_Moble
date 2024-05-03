import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/home/Home';
import SignIn from '../screen/auth/SignIn';
import SignUp from '../screen/auth/SignUp';
import BottomTabs from './BottomTabs';

export default function Navigation() {
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
      </Stack.Navigator>
    </>
  );
}
