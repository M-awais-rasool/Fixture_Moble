import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
const windowHeight = Dimensions.get('window').height;

export default function Loader() {
  return (
    <View style={style.container}>
      <LottieView
        source={require('../../assets/Loading.json')}
        autoPlay
        style={style.loading}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // height: windowHeight / 1.7,
    // width: '100%',
  },
  loading: {
    width: 150,
    height: 150,
  },
});
