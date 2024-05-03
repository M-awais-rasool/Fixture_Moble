import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import favouriteScreen from '../screen/favouriteScreen/FavouriteScreen';
import MessageScreen from '../screen/messageScreen/MessageScreen';
import UserProfile from '../screen/userProfile/UserProfile';
import BottomStack from './BottomStack';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../component/header/Header';

export default function BottomTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <Header />
      <Tab.Navigator
        initialRouteName="BottomStack"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            // height: 60,
            elevation: 10,
            borderTopColor: '#F29900',
            borderTopWidth: 2,
          },
        }}>
        <Tab.Screen
          component={BottomStack}
          name="BottomStack"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}: any) => {
              return (
                <View>
                  {focused ? (
                    <Image source={require('../assets/images/Vector3.png')} />
                  ) : (
                    <Image
                      source={require('../assets/images/Vector3.png')}
                      style={{tintColor: 'black'}}
                    />
                  )}
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          component={favouriteScreen}
          name="favouriteScreen"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}: any) => {
              return (
                <View>
                  {focused ? (
                    <Image
                      source={require('../assets/images/Vector.png')}
                      style={{tintColor: '#F29900'}}
                    />
                  ) : (
                    <Image source={require('../assets/images/Vector.png')} />
                  )}
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          component={MessageScreen}
          name="MessageScreen"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}: any) => {
              return (
                <View>
                  {focused ? (
                    <Image
                      source={require('../assets/images/Vector1.png')}
                      style={{tintColor: '#F29900'}}
                    />
                  ) : (
                    <Image source={require('../assets/images/Vector1.png')} />
                  )}
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          component={UserProfile}
          name="UserProfile"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}: any) => {
              return (
                <View>
                  {focused ? (
                    <Image
                      source={require('../assets/images/Vector2.png')}
                      style={{tintColor: '#F29900'}}
                    />
                  ) : (
                    <Image source={require('../assets/images/Vector2.png')} />
                  )}
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({});
