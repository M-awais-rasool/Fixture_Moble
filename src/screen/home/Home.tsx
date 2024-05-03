import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/header/Header';
import {
  get_mainCategories_detail,
  get_papular_products,
} from '../../api/services/Get';
import Slider from '../../component/slider/Slider';
import style from './style';
import {TouchableOpacity} from 'react-native';

export default function Home() {
  const [getCategories_detail, setGetCategories_detail] = useState([]);
  const [getPapular_ProductsL, setGetPapular_ProductsL] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const mainCategories_detail: any = await get_mainCategories_detail();
    setGetCategories_detail(mainCategories_detail);
    const papular_ProductsL: any = await get_papular_products();
    setGetPapular_ProductsL(papular_ProductsL);
  };
  return (
    <View>
      <Header />
      <View style={{marginHorizontal: 15}}>
        <View style={style.textContainer}>
          <Text style={style.CategoriesText}>Categories</Text>
          <TouchableOpacity>
            <Text style={style.viewText}>View all</Text>
          </TouchableOpacity>
        </View>
        <Slider data={getCategories_detail} />
        <View style={[style.textContainer,{marginTop:10}]}>
          <Text style={style.CategoriesText}>Papular Products</Text>
          <TouchableOpacity>
            <Text style={style.viewText}>View all</Text>
          </TouchableOpacity>
        </View>
        <Slider data={getPapular_ProductsL} type={'PapularProduct'} />
      </View>
    </View>
  );
}
