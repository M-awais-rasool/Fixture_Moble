import {View, Text, ImageBackground, Image, Dimensions} from 'react-native';
import React from 'react';
import style from './style';
import TextInputs from '../textInput/TextInputs';
const windowWidth = Dimensions.get('window').width;

export default function Header() {
  return (
    <View>
      <ImageBackground
        source={require('../../assets/images/HeaderBackgroundImg.png')}
        style={style.BackgroundImg}>
        <View style={style.container}>
          <Image source={require('../../assets/images/notification-add.png')} />
          <Image source={require('../../assets/images/shopping-cart.png')} />
        </View>
        <View style={{alignItems: 'center', marginTop: -6}}>
          <TextInputs
            placeholder={'Search product here'}
            style={{
              width: windowWidth / 1.2,
              backgroundColor: 'white',
              borderColor: 'white',
              elevation: 5,
            }}
            icon={<Image source={require('../../assets/images/search.png')} />}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
