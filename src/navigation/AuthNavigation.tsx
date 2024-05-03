import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screen/auth/SignIn';
import SignUp from '../screen/auth/SignUp';
import BottomTabs from './BottomTabs';

export default function AuthNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
}
