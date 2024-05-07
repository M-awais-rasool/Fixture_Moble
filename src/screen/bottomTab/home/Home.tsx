import {View, Text, ScrollView, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  get_mainCategories_detail,
  get_onSale_products,
  get_papular_products,
  get_testimonial,
} from '../../../api/services/Get';
import Slider from '../../../component/sliders/Slider';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import Product_cart from '../../../component/product_cart/Product_cart';
import Buttons from '../../../component/buttons/Buttons';
import Theme from '../../../theme/Theme';

export default function Home() {
  const [getCategories_detail, setGetCategories_detail] = useState([]);
  const [getPapular_Product, setGetPapular_Product] = useState([]);
  const [getOnSale, setGetOnSale] = useState([]);
  const [testimonials, setTestimonial] = useState([]);
  const nav: any = useNavigation();

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
        <Text style={style.CategoriesText}>Papular Products</Text>
        <View style={style.productContainer}>
          {getPapular_Product
            .map((val: any, index: any) => (
              <View key={index}>
                <Product_cart
                  data={val}
                  onPress={() => {
                    nav.navigate('Product_Details', {Id: val.productId});
                  }}
                />
              </View>
            ))
            .slice(15)}
        </View>
        <View style={{alignItems: 'center'}}>
          <Buttons title={'See All Popular'} onPress={() => {}} />
        </View>
        <Text
          style={[
            style.CategoriesText,
            {marginTop: Theme.fontSize.size20, marginBottom: -5},
          ]}>
          Onsale Products
        </Text>
        <View style={style.productContainer}>
          {getOnSale
            .map((val: any, index: any) => (
              <View key={index}>
                <Product_cart
                  data={val}
                  onPress={() => {
                    nav.navigate('Product_Details', {Id: val.productId});
                  }}
                />
              </View>
            ))
            .slice(15)}
        </View>
        <View style={{alignItems: 'center'}}>
          <Buttons title={'See All OnSale'} onPress={() => {}} />
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
