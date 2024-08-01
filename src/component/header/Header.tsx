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
import {useNavigation} from '@react-navigation/native';
import {get_products_quantity} from '../../api/services/Get';
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
    if (res != null) {
      context.isAdd_To_Cart_State(res);
    } else {
      context.isAdd_To_Cart_State(0);
    }
  };
  const handleSearch = () => {
    if (search.trim() !== '') {
      nav.navigate('searchScrenn', {key: search});
    }
  };
  return (
    <View style={{height: 110}}>
      <ImageBackground
        source={require('../../assets/images/HeaderBackgroundImg.png')}
        style={style.BackgroundImg}>
        <View style={style.container}>
          <Image
            source={require('../../assets/images/Frame.png')}
            style={{width: 70, height: 30}}
          />
          <TouchableOpacity
            onPress={() => {
              nav.navigate('Add_To_Cart');
            }}>
            <View>
              <Image
                source={require('../../assets/images/shopping-cart.png')}
              />
            </View>
            <View style={style.addTocartContainer}>
              <Text style={style.addToCartText}>{context.addToCartState}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: -10}}>
          <TextInputs
            onChange={setSearch}
            placeholder={'Search products...'}
            style={{
              width: windowWidth / 1.2,
              backgroundColor: 'white',
              borderColor: 'white',
              elevation: 5,
              color: 'black',
              height: 40,
            }}
            icon={
              search == '' ? (
                <TouchableOpacity disabled>
                  <Image source={require('../../assets/images/search.png')} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    handleSearch();
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
