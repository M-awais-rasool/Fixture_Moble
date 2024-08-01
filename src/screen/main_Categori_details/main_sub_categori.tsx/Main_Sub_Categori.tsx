import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {get_SubCategory_products} from '../../../api/services/Get';
import style from '../style';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Loader from '../../../component/loader/Loader';
import Product_cart from '../../../component/product_cart/Product_cart';
import {isNetworkAvailable} from '../../../api/Api';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export default function Main_Sub_Categori() {
  const Route: any = useRoute();
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav: any = useNavigation();

  useEffect(() => {
    getCategoriData();
  }, []);
  const getCategoriData = async () => {
    setLoading(true);
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const getSubCategoriData = await get_SubCategory_products(
          Route.params.ID,
        );
        setGetData(getSubCategoriData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
    <ScrollView style={[style.mainContainer,{paddingHorizontal:10}]}>
      <Text style={[style.mainTextHeading, {marginTop: 20}]}>
        {Route.params.name} Furniture
      </Text>
      {loading ? (
        <View style={style.mainContainer}>
          <Loader />
        </View>
      ) : (
        <View style={style.subCategoriContainer}>
          {getData.length > 0 ? (
            getData.map((val: any, index: any) => (
              <Product_cart
                data={val}
                onPress={() => {
                  nav.navigate('Product_Details', {Id: val.productId});
                }}
              />
            ))
          ) : (
            <View style={{alignItems: 'center', rowGap: 10}}>
              <Text style={[style.mainTextHeading, {marginTop: 20}]}>
                Product Not Found
              </Text>
              <TouchableOpacity
                onPress={() => {
                  nav.goBack();
                }}>
                <Text style={style.backBtn}>Go Back</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
