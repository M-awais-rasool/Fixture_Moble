import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function GoogleBtn(props: any) {
  return (
    <View>
      <TouchableOpacity style={style.googleBtn}>
        <Image source={require('../../assets/images/googleimg.png')} />
        <Text style={style.googleText}>{props.lebel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  googleBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    paddingLeft: 25,
    borderColor: '#606060',
  },
  googleText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    marginLeft: 35,
  },
});
