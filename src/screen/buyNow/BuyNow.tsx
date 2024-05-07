import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import style from './style';
import TextInputs from '../../component/textInput/TextInputs';

export default function BuyNow() {
  return (
    <ScrollView style={style.mainContainer}>
      <View style={style.Contianer}>
        <TextInputs lebel={'Full Name*'} />
        <TextInputs lebel={'E-mail*'} />
        <TextInputs lebel={'Receiver Phone No*'} />
        <TextInputs lebel={'Comment'} />
      </View>
    </ScrollView>
  );
}
