import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {get_products} from '../../api/services/Get';
import {useNavigation, useRoute} from '@react-navigation/native';
import style from './style';
import Theme from '../../theme/Theme';
import {TouchableOpacity} from 'react-native';
import {add_to_WishList} from '../../api/services/Post';
import Toast from 'react-native-toast-message';
import {remove_to_WishList} from '../../api/services/Delete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../component/loader/Loader';
import {useGlobalContext} from '../../component/context.tsx/Context';
import Buttons from '../../component/buttons/Buttons';
const windowWidth = Dimensions.get('window').width;

export default function Product_cart() {
  const Route: any = useRoute();
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState<any>([]);
  const [wishListFlag, setWishListFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav: any = useNavigation();
  const context: any = useGlobalContext();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoading(true);
    const getProduct: any = await get_products(Route.params.Id);
    setData(getProduct);
    setLoading(false);
  };
  const addToWishList = async () => {
    let toke = await AsyncStorage.getItem('token');
    if (toke) {
      setWishListFlag(!wishListFlag);
      if (wishListFlag) {
        const res = await remove_to_WishList(data?.productId);
        if (res.status == 200) {
          Toast.show({
            type: 'success',
            text1: res.data.message + '.😒',
            visibilityTime: 2000,
          });
        }
      } else {
        const res = await add_to_WishList(data?.productId);
        if (res.status == 200) {
          Toast.show({
            type: 'success',
            text1: res.data.message + '.😍',
            visibilityTime: 2000,
          });
        }
      }
    } else {
      AsyncStorage.clear();
      nav.navigate('SignIn');
    }
  };
  const addToCart = () => {
    context.isAdd_To_Cart_State(context.addToCartState + quantity);
  };
  return (
    <>
      {loading ? (
        <View style={style.mainContainer}>
          <Loader />
        </View>
      ) : (
        <ScrollView style={style.mainContainer}>
          <View style={style.Contianer}>
            {data?.productMedias?.map((val: any, index: any) => (
              <View>
                <Image source={{uri: val.imgUrl}} style={style.mainImg} />
              </View>
            ))}
            <Text style={style.mainTextHeading}>{data?.productName}</Text>
            <Text style={style.highlightText}>Highlight's</Text>
            <Text
              style={[style.highlightText, {fontSize: Theme.fontSize.size12}]}>
              {data?.highLight}
            </Text>
            <View style={style.line} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={style.Price}>Rs: {data?.price}</Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <TouchableOpacity onPress={() => addToWishList()}>
                  {wishListFlag ? (
                    <Image
                      source={require('../../assets/images/favourite1.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/favourite.png')}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    addToCart();
                  }}>
                  <Image
                    source={require('../../assets/images/add-shopping-cart.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {data?.discountPrice > 0 && (
              <View style={style.rowContainer}>
                <Text style={style.DiccountText}>
                  Rs: {data?.discountPrice}
                </Text>
                <Text style={style.DiccountOffText}>{data?.discount}% Off</Text>
              </View>
            )}
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <Text style={style.highlightText}>Quantity </Text>
              <TouchableOpacity
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}>
                <Text
                  style={[
                    style.highlightText,
                    {fontWeight: '800', fontSize: 18},
                  ]}>
                  -
                </Text>
              </TouchableOpacity>
              <View style={style.quantityBox}>
                <Text style={[style.highlightText, {marginTop: -1}]}>
                  {quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setQuantity(quantity + 1);
                }}>
                <Text
                  style={[
                    style.highlightText,
                    {fontWeight: '800', fontSize: 16},
                  ]}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Buttons title={'Buy Now'} onPress={() => {}} />
            </View>
          </View>
          <View style={{marginBottom: 10}} />
          <View style={style.Contianer}>
            <Text style={style.deliveryText}>Delivery</Text>
            <View style={style.deliveryContainer}>
              <View style={style.deliveryInnerContainer1}>
                <Image
                  source={require('../../assets/images/location.png')}
                  style={{marginTop: 20}}
                />
                <Buttons title={'Change'} onPress={() => {}} />
              </View>
              <View style={style.line1} />
              <View style={style.deliveryInnerContainer2}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Image source={require('../../assets/images/HomeIcon.png')} />
                  <Text style={style.Price}>Home Delivery</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Image source={require('../../assets/images/money.png')} />
                  <Text style={style.Price}>
                    Delivery: Lahore, Rawalpindi and {'    '}Islamabad
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginBottom: 50}} />
        </ScrollView>
      )}
    </>
  );
}
