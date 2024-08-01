import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import Theme from '../../theme/Theme';
interface props {
  secureTextEntry?: boolean;
  style?: any;
  Textlebel?: string;
  keyboardType?: any;
  lebel?: any;
  placeholder?: string;
  maxLength?: number;
  value?: any;
  readOnly?: boolean;
  icon?: any;
  multiline?:any
  onChange?: (i: any) => void;
}
export default function TextInputs(props: props) {
  return (
    <View>
      <Text style={style.lebel}>{props.lebel}</Text>
      <TextInput
        style={[style.input, props.style]}
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        onChangeText={(e: any) => {
          props.onChange?.(e);
        }}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
        value={props.value}
        readOnly={props.readOnly}
        multiline={props.multiline}
      />
      <View style={style.icon}>{props.icon}</View>
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    borderWidth: Theme.fontSize.size1,
    borderRadius: Theme.fontSize.size5,
    borderColor: '#606060',
    height: Theme.fontSize.size40,
    fontSize: Theme.fontSize.size14,
    fontWeight: '500',
    paddingLeft: Theme.fontSize.size10,
    color: Theme.colors.black,
    paddingRight: Theme.fontSize.size35,
  },
  lebel: {
    fontSize: Theme.fontSize.size14,
    fontWeight: '500',
    color: Theme.colors.black,
    marginLeft: Theme.fontSize.size5,
    marginBottom: Theme.fontSize.size2,
  },
  icon: {
    position: 'absolute',
    right: Theme.fontSize.size10,
    top: Theme.fontSize.size29,
  },
});
