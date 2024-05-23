import {View, Image, Animated, Dimensions} from 'react-native';
import React, {useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WishList from '../screen/bottomTab/wishList/WishList';
import searchScrenn from '../screen/bottomTab/search/SearchScreen';
import UserProfile from '../screen/bottomTab/userProfile/UserProfile';
import BottomStack from './BottomStack';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../component/header/Header';

export default function BottomTabs() {
  const Tab = createBottomTabNavigator();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
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
            height: 60,
            borderRadius: 10,
            paddingHorizontal: 20,
            elevation: 10,
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
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          component={WishList}
          name="WishList"
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
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1.4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          component={searchScrenn}
          name="searchScrenn"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}: any) => {
              return (
                <View>
                  {focused ? (
                    <Image
                      source={require('../assets/images/bottomSearch.png')}
                      style={{tintColor: '#F29900'}}
                    />
                  ) : (
                    <Image
                      source={require('../assets/images/bottomSearch.png')}
                    />
                  )}
                </View>
              );
            },
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2.8,
                useNativeDriver: true,
              }).start();
            },
          })}
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
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4.3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: '#F29900',
          position: 'absolute',
          bottom: 60,
          left: 40,
          borderRadius: 20,
          transform: [{translateX: tabOffsetValue}],
        }}></Animated.View>
    </SafeAreaView>
  );

  function getWidth() {
    let width = Dimensions.get('window').width;
    width = width - 80;
    return width / 5;
  }
}
