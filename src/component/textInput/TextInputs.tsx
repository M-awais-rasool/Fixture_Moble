import {View, Text, TextInput} from 'react-native';
import React from 'react';
import style from './style';

export default function TextInputs(props: any) {
  return (
    <View>
      <Text style={style.lebel}>{props.lebel}</Text>
      <TextInput
        style={[style.input, props.style]}
        placeholder={props.placeholder}
        onChangeText={(e:any)=>{props.onChange(e)}}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
        value={props.value}
        readOnly={props.readOnly}
      />
      <View style={style.icon}>{props.icon}</View>
    </View>
  );
}
