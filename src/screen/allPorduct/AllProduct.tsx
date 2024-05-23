import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Product_cart from '../../component/product_cart/Product_cart';
import style from '../bottomTab/home/style';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGlobalContext} from '../../component/context.tsx/Context';
import {isNetworkAvailable} from '../../api/Api';
import {add_to_Cart} from '../../api/services/Post';
import Loader from '../../component/loader/Loader';

export default function AllProduct() {
  const Route: any = useRoute();
  const nav: any = useNavigation();
  const context: any = useGlobalContext();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);
  const addToCart = async (id: any) => {
    let token = await AsyncStorage.getItem('token');
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      if (token) {
        const res: any = await add_to_Cart(id, 1);
        if (res.status == 200) {
          context.isAdd_To_Cart_State(context.addToCartState + 1);
          Toast.show({
            type: 'success',
            text1: res.data.message + '.😍',
            visibilityTime: 3000,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: res.data.message,
            visibilityTime: 3000,
          });
        }
      } else {
        AsyncStorage.clear();
        nav.navigate('SignIn');
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'No internet connection available!',
        position: 'bottom',
        swipeable: true,
        autoHide: false,
      });
    }
  };
  return (
    <ScrollView style={{height: '100%', backgroundColor: 'white'}}>
      <Text style={style.CategoriesText}>Popular Products</Text>
      {loading ? (
        <View>
          <Loader />
        </View>
      ) : (
        <View style={style.productContainer}>
          {Route.params.data.map((val: any, index: any) => (
            <View key={index}>
              <Product_cart
                data={val}
                onCartPress={() => {
                  addToCart(val.productId);
                }}
                onPress={() => {
                  nav.navigate('Product_Details', {Id: val.productId});
                }}
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
