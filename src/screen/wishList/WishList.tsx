import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import style from './style';
import {ScrollView} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {get_WishLit_products} from '../../api/services/Get';
import {remove_to_WishList} from '../../api/services/Delete';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../component/loader/Loader';

export default function WishList() {
  const [data, setData] = useState([]);
  const nav: any = useNavigation();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );
  const getData = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('token');
    if (token) {
      const wishListData: any = await get_WishLit_products();
      setData(wishListData);
      setLoading(false);
    } else {
      setLoading(false);
      nav.replace('SignIn');
    }
  };
  const removeToWishList = async (id: any) => {
    const res = await remove_to_WishList(id);
    getData();
    if (res.status == 200) {
      Toast.show({
        type: 'success',
        text1: res.data.message + '.😒',
        visibilityTime: 2000,
      });
    }
  };
  return (
    <>
      {loading ? (
        <View style={style.mainContainer}>
          <Loader />
        </View>
      ) : (
        <ScrollView style={style.mainContainer}>
          <Text style={style.MinText}>My WishList</Text>
          {data.length > 0 ? (
            data.map((val: any, index: any) => (
              <View key={index} style={style.cartContainer}>
                <Image source={{uri: val.image}} style={style.img} />
                <View style={{width: '100%'}}>
                  <View style={style.wishlistContainer}>
                    <TouchableOpacity
                      onPress={() => removeToWishList(val.productId)}>
                      <Image
                        source={require('../../assets/images/favourite1.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        source={require('../../assets/images/add-shopping-cart.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={style.productNameText} numberOfLines={1}>
                    {val.productName}
                  </Text>
                  <Text style={style.Price}>Rs: {val.price}</Text>
                  {val.discountPrice > 0 && (
                    <View style={style.rowContainer}>
                      <Text style={style.DiccountText}>
                        Rs: {val.discountPrice}
                      </Text>
                      <Text style={style.DiccountOffText}>
                        {val.discount}% Off
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View style={{alignItems: 'center', rowGap: 10}}>
              <Text style={style.emptyText}>Your WishList is Empty</Text>
              <TouchableOpacity
                onPress={() => {
                  nav.goBack();
                }}>
                <Text style={style.addText}>{'Add Something :)'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
}
