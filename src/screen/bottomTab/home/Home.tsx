import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
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

export default function Home() {
  const [getCategories_detail, setGetCategories_detail] = useState([]);
  const [getPapular_Product, setGetPapular_Product] = useState([]);
  const [getOnSale, setGetOnSale] = useState([]);
  const [testimonials, setTestimonial] = useState([]);
  const nav: any = useNavigation();
  const context: any = useGlobalContext();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const mainCategories_detail: any = await get_mainCategories_detail();
    setGetCategories_detail(mainCategories_detail);
    const papular_ProductsL: any = await get_papular_products();
    setGetPapular_Product(papular_ProductsL);
    const res = await get_onSale_products();
    setGetOnSale(res);
    const gettestimonial = await get_testimonial();
    setTestimonial(gettestimonial);
  };

  const addToCart = async (id: any) => {
    let token = await AsyncStorage.getItem('token');
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
  };
  return (
    <ScrollView style={style.container}>
      <View
        style={{
          marginHorizontal: Theme.fontSize.size20,
          marginTop: Theme.fontSize.size20,
        }}>
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
        <View style={style.textContainer}>
          <Text style={style.CategoriesText}>Papular Products</Text>
          <TouchableOpacity>
            <Text style={style.viewText}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={style.productContainer}>
          {getPapular_Product.slice(0, 4).map((val: any, index: any) => (
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
        <View
          style={[
            style.textContainer,
            {marginTop: Theme.fontSize.size20, marginBottom: -10},
          ]}>
          <Text style={style.CategoriesText}>Onsale Products</Text>
          <TouchableOpacity>
            <Text style={style.viewText}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={style.productContainer}>
          {getOnSale.slice(0, 4).map((val: any, index: any) => (
            <View key={index}>
              <Product_cart
                data={val}
                onPress={() => {
                  nav.navigate('Product_Details', {Id: val.productId});
                }}
              />
            </View>
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
