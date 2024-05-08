import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import Theme from '../../theme/Theme';

export default function TextInputs(props: any) {
  return (
    <View>
      <Text style={style.lebel}>{props.lebel}</Text>
      <TextInput
        style={[style.input, props.style]}
        placeholder={props.placeholder}
        onChangeText={(e: any) => {
          props.onChange(e);
        }}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
        value={props.value}
        readOnly={props.readOnly}
      />
      <View style={style.icon}>{props.icon}</View>
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius:Theme.fontSize.size5,
    borderColor: '#606060',
    height: Theme.fontSize.size40,
    fontSize: Theme.fontSize.size14,
    fontWeight: '500',
    paddingLeft: Theme.fontSize.size10,
    color: 'black',
    paddingRight: Theme.fontSize.size35,
  },
  lebel: {
    fontSize: Theme.fontSize.size14,
    fontWeight: '500',
    color: 'black',
    marginLeft: Theme.fontSize.size5,
    marginBottom: 2,
  },
  icon: {
    position: 'absolute',
    right: Theme.fontSize.size10,
    top: Theme.fontSize.size29,
  },
});
