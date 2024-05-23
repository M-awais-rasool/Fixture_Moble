import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import Theme from '../../theme/Theme';
interface GoogleBtn {
  lebel?: string;
  onPress?: () => void;
}
export default function GoogleBtn(props: GoogleBtn) {
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
    borderWidth: Theme.fontSize.size1,
    padding: Theme.fontSize.size10,
    alignItems: 'center',
    borderRadius: Theme.fontSize.size5,
    paddingLeft: Theme.fontSize.size25,
    borderColor: '#606060',
    height: Theme.fontSize.size40,
  },
  googleText: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    color: Theme.colors.black,
    marginLeft: Theme.fontSize.size35,
  },
});
