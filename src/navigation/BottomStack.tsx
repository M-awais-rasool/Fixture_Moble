import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/home/Home';
import BottomTabs from './BottomTabs';
import Main_categori_details from '../screen/main_Categori_details/Main_categori_details';
import Main_Sub_Categori from '../screen/main_Categori_details/main_sub_categori.tsx/Main_Sub_Categori';

export default function BottomStack() {
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Main_categori_details"
          component={Main_categori_details}
        />
        <Stack.Screen name="Main_Sub_Categori" component={Main_Sub_Categori} />

        <Stack.Screen name="BottomTabs" component={BottomTabs} />
      </Stack.Navigator>
    </>
  );
}
