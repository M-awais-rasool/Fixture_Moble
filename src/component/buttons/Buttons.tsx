import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Theme from '../../theme/Theme';

export default function Buttons(props: any) {
  return (
    <View>
      <TouchableOpacity onPress={() => props.onPress()} disabled={props.disabled}>
        <Text style={[style.btn, props.style]}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  btn: {
    backgroundColor: '#F29900',
    padding: Theme.fontSize.size10,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: Theme.fontSize.size20,
    color: 'white',
    fontSize: Theme.fontSize.size13,
    fontWeight: '500',
    borderRadius: Theme.fontSize.size5,
  },
});
