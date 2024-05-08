import {
  View,
  ImageBackground,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from './style';
import TextInputs from '../textInput/TextInputs';
import {useGlobalContext} from '../context.tsx/Context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {get_products_quantity} from '../../api/services/Get';
import { Screen } from 'react-native-screens';
const windowWidth = Dimensions.get('window').width;

export default function Header() {
  const context: any = useGlobalContext();
  const nav: any = useNavigation();
  const [search, setSearch] = useState('');

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await get_products_quantity();
    context.isAdd_To_Cart_State(res);
  };
  return (
    <View style={{height: 103}}>
      <ImageBackground
        source={require('../../assets/images/HeaderBackgroundImg.png')}
        style={style.BackgroundImg}>
        <View style={style.container}>
          <Image source={require('../../assets/images/notification-add.png')} />
          <View>
            <TouchableOpacity
              onPress={() => {
                nav.navigate('Add_To_Cart');
              }}>
              <Image
                source={require('../../assets/images/shopping-cart.png')}
              />
            </TouchableOpacity>
            <View style={style.addTocartContainer}>
              <Text style={style.addToCartText}>{context.addToCartState}</Text>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: -6}}>
          <TextInputs
            onChange={setSearch}
            placeholder={'Search product here'}
            style={{
              width: windowWidth / 1.2,
              backgroundColor: 'white',
              borderColor: 'white',
              elevation: 5,
            }}
            icon={
              search == '' ? (
                <TouchableOpacity disabled>
                  <Image source={require('../../assets/images/search.png')} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    nav.navigate('searchScrenn',{key:search});
                  }}>
                  <Image source={require('../../assets/images/search.png')} />
                </TouchableOpacity>
              )
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
}
