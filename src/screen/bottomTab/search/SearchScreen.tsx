import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {get_search_product} from '../../../api/services/Get';
import style from './style';
import Product_cart from '../../../component/product_cart/Product_cart';
import {add_to_Cart} from '../../../api/services/Post';
import Toast from 'react-native-toast-message';
import {useGlobalContext} from '../../../component/context.tsx/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from '../../../theme/Theme';
import Loader from '../../../component/loader/Loader';
import {isNetworkAvailable} from '../../../api/Api';

export default function MessageScreen() {
  const [data, setData] = useState<any>();
  const Route: any = useRoute();
  const nav: any = useNavigation();
  const context: any = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [img, setimg] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );
  const getData = async () => {
    setLoading(true);
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res: any = await get_search_product(Route.params?.key);
        console.log(res)
        setimg(res.productMedias);
        setLoading(false);
        setData(res);
      } catch (error: any) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  const addToCart = async (id: any) => {
    let token = await AsyncStorage.getItem('token');
    setLoading(true);
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
    <ScrollView style={style.mainContainer}>
      {loading ? (
        <View style={style.mainContainer}>
          <Loader />
        </View>
      ) : (
        <View style={style.productContainer}>
          {data?.length > 0 &&
            data.map((val: any, index: any) => (
              <View key={index}>
                <Product_cart
                  type={'search'}
                  data={val}
                  img={data}
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
      <View style={{marginTop: Theme.fontSize.size20}} />
    </ScrollView>
  );
}
