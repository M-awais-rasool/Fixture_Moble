import {View, Text, ScrollView, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  get_mainCategories_detail,
  get_onSale_products,
  get_papular_products,
  get_testimonial,
} from '../../../api/services/Get';
import Slider from '../../../component/sliders/Slider';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import Product_cart from '../../../component/product_cart/Product_cart';
import Theme from '../../../theme/Theme';
import {add_to_Cart} from '../../../api/services/Post';
import Toast from 'react-native-toast-message';
import {useGlobalContext} from '../../../component/context.tsx/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShimerLoading from '../../../component/shimerLoading/ShimerLoading';
import * as Animatable from 'react-native-animatable';
import {isNetworkAvailable} from '../../../api/Api';

export default function Home() {
  const [getCategories_detail, setGetCategories_detail] = useState<any>([]);
  const [getPapular_Product, setGetPapular_Product] = useState<any>([]);
  const [getOnSale, setGetOnSale] = useState([]);
  const [testimonials, setTestimonial] = useState([]);
  const nav: any = useNavigation();
  const context: any = useGlobalContext();
  const [scroll, setScroll] = useState<any>(0);
  let data1 = [1, 2, 3, 4];

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const mainCategories_detail: any = await get_mainCategories_detail();
        setGetCategories_detail(mainCategories_detail);
        const papular_ProductsL: any = await get_papular_products();
        setGetPapular_Product(papular_ProductsL);
        const res = await get_onSale_products();
        setGetOnSale(res);
        const gettestimonial = await get_testimonial();
        setTestimonial(gettestimonial);
      } catch (error) {
        console.log(error);
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
    <ScrollView
      style={style.container}
      onScroll={e => {
        setScroll(e.nativeEvent.contentOffset.y.toFixed(0));
      }}>
      <View
        style={{
          marginHorizontal: Theme.fontSize.size20,
          marginTop: Theme.fontSize.size20,
        }}>
        {getCategories_detail?.length > 0 ? (
          <Slider
            data={getCategories_detail}
            type={''}
            onPress={(data: any) => {
              nav.navigate('Main_categori_details', {
                data: data.categories,
                name: data.name,
              });
            }}
          />
        ) : (
          <View style={{flexDirection: 'row', gap: Theme.fontSize.size10}}>
            {data1.map((val: any, index: any) => (
              <Animatable.View
                key={index}
                animation={'fadeInDown'}
                duration={1500}
                style={[
                  style.Shimercontainer,
                  {width: Theme.fontSize.size75, height: Theme.fontSize.size75},
                ]}>
                <ShimerLoading
                  style={{
                    height: Theme.fontSize.size75,
                    opacity: 0.2,
                    backgroundColor: '#9e9e9e',
                  }}
                />
              </Animatable.View>
            ))}
          </View>
        )}

        <View style={style.textContainer}>
          <Text style={style.CategoriesText}>Popular Products</Text>
          {getOnSale.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                nav.navigate('AllProduct', {data: getPapular_Product});
              }}>
              <Text style={style.viewText}>View All</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={style.productContainer}>
          {getPapular_Product.length > 0
            ? getPapular_Product.slice(0, 4).map((val: any, index: any) => (
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
              ))
            : data1.map((val: any, index: any) => (
                <Animatable.View
                  key={index}
                  animation={'fadeInLeft'}
                  duration={1500}
                  style={style.Shimercontainer}>
                  <ShimerLoading
                    style={{
                      height: Theme.fontSize.size150,
                      opacity: 0.2,
                      backgroundColor: '#9e9e9e',
                    }}
                  />
                  <View style={{padding: 7, rowGap: 10}}>
                    <ShimerLoading
                      style={{
                        height: Theme.fontSize.size14,
                        width: '90%',
                        opacity: 0.2,
                        backgroundColor: '#9e9e9e',
                      }}
                    />
                    <ShimerLoading
                      style={{
                        height: Theme.fontSize.size14,
                        width: '90%',
                        opacity: 0.2,
                        backgroundColor: '#9e9e9e',
                      }}
                    />
                    <ShimerLoading
                      style={{
                        height: Theme.fontSize.size14,
                        width: '50%',
                        opacity: 0.2,
                        backgroundColor: '#9e9e9e',
                      }}
                    />
                  </View>
                </Animatable.View>
              ))}
        </View>

        <View
          style={[
            style.textContainer,
            {marginTop: Theme.fontSize.size20, marginBottom: -10},
          ]}>
          <Text style={style.CategoriesText}>Onsale Products</Text>
          {getOnSale.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                nav.navigate('AllProduct', {data: getOnSale});
              }}>
              <Text style={style.viewText}>View All</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={style.productContainer}>
          {getOnSale.length > 0
            ? getOnSale.slice(0, 4).map((val: any, index: any) => (
                <View key={index}>
                  <Product_cart
                    data={val}
                    onPress={() => {
                      nav.navigate('Product_Details', {Id: val.productId});
                    }}
                  />
                </View>
              ))
            : data1.map((val: any, index: any) => (
                <Animatable.View
                  key={index}
                  animation={'fadeInLeft'}
                  duration={1500}
                  style={style.Shimercontainer}>
                  <ShimerLoading
                    style={{
                      height: Theme.fontSize.size150,
                      opacity: 0.2,
                      backgroundColor: '#9e9e9e',
                    }}
                  />
                  <View
                    style={{
                      padding: Theme.fontSize.size7,
                      rowGap: Theme.fontSize.size10,
                    }}>
                    <ShimerLoading
                      style={{
                        height: Theme.fontSize.size14,
                        width: '90%',
                        opacity: 0.2,
                        backgroundColor: '#9e9e9e',
                      }}
                    />
                    <ShimerLoading
                      style={{
                        height: Theme.fontSize.size14,
                        width: '90%',
                        opacity: 0.2,
                        backgroundColor: '#9e9e9e',
                      }}
                    />
                    <ShimerLoading
                      style={{
                        height: Theme.fontSize.size14,
                        width: '50%',
                        opacity: 0.2,
                        backgroundColor: '#9e9e9e',
                      }}
                    />
                  </View>
                </Animatable.View>
              ))}
        </View>
        <Text
          style={[
            style.CategoriesText,
            {marginVertical: Theme.fontSize.size20},
          ]}>
          Testimonial
        </Text>
      </View>
      <Slider data={testimonials} pagingEnabled={true} />
      <View style={{marginBottom: Theme.fontSize.size20}} />
    </ScrollView>
  );
}
