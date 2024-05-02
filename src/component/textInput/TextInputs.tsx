import {View, Text, TextInput} from 'react-native';
import React from 'react';
import style from './style';

export default function TextInputs(props: any) {
  return (
    <View>
      <Text style={style.lebel}>{props.lebel}</Text>
      <TextInput  style={style.input} placeholder={props.placeholder} />
      <View style={style.icon}>
        {props.icon}
      </View>
    </View>
  );
}
