import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Theme from '../../theme/Theme';
interface Buttons {
  disabled?: boolean;
  title?: string;
  style?: ViewStyle;
  onPress?: () => void;
}
export default function Buttons(props: Buttons) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.onPress?.()}
        disabled={props.disabled}>
        <Text style={[style.btn, props.style]}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  btn: {
    backgroundColor: Theme.colors.BtnColor,
    padding: Theme.fontSize.size10,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: Theme.fontSize.size20,
    color: Theme.colors.white,
    fontSize: Theme.fontSize.size13,
    fontWeight: '500',
    borderRadius: Theme.fontSize.size5,
  },
});
