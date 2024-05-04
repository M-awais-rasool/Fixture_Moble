import {View, Text} from 'react-native';
import React from 'react';
import style from './style';
import {ScrollView} from 'react-native';

export default function WishList() {
  return (
    <ScrollView style={style.mainContainer}>
      <Text style={style.MinText}>My WishList</Text>
    </ScrollView>
  );
}
