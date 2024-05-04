import {View,ImageBackground, Image, Dimensions, Text} from 'react-native';
import React from 'react';
import style from './style';
import TextInputs from '../textInput/TextInputs';
import { useGlobalContext } from '../context.tsx/Context';
import { useRoute } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;

export default function Header() {
  const context :any= useGlobalContext();
  const Route = useRoute();
  // console.log('Route.name  '+Route.name);
  return (
    <View style={{height: 103}}>
      <ImageBackground
        source={require('../../assets/images/HeaderBackgroundImg.png')}
        style={style.BackgroundImg}>
        <View style={style.container}>
          <Image source={require('../../assets/images/notification-add.png')} />
          <View>
          <Image source={require('../../assets/images/shopping-cart.png')}/>
        <View style={style.addTocartContainer}>
        <Text style={style.addToCartText}>{context.addToCartState}</Text>
        </View>
          </View>
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
