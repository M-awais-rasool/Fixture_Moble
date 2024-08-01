import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from './style';
import PopUp from '../../component/popUp/PopUp';
import Loader from '../../component/loader/Loader';
import {useNavigation} from '@react-navigation/native';
import {get_cart_products, get_products_quantity} from '../../api/services/Get';
import {remove_to_cart} from '../../api/services/Delete';
import {useGlobalContext} from '../../component/context.tsx/Context';
import {add_to_Cart_Quantity} from '../../api/services/Post';
import {remove_to_cartQuantity} from '../../api/services/Put';
import Theme from '../../theme/Theme';
import Buttons from '../../component/buttons/Buttons';
import {isNetworkAvailable} from '../../api/Api';
import Toast from 'react-native-toast-message';

export default function Add_To_Cart() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [subtotal, setSubtotal] = useState<any>(0);
  const [discount, setDiscount] = useState<any>(0);
  const [total, setTotal] = useState<any>(0);
  const [id, setId] = useState();
  const nav: any = useNavigation();
  const context: any = useGlobalContext();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    // setLoading(true);
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res = await get_cart_products();
        console.log(res);
        setData(res);
        TotalPrice(res);
        setLoading(false);
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: error,
          position: 'top',
          swipeable: true,
          autoHide: false,
        });
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
  const TotalPrice = (data: any) => {
    let SubtotalPrice;
    let totalPrice;
    let DiscountPrice;
    data?.cartProduct?.map((val: any) => {
      SubtotalPrice = val.totalDiscountPrice + subtotal;
      totalPrice = val.totalPrice + total;
      DiscountPrice = total - subtotal;
    });
    setSubtotal(SubtotalPrice);
    setTotal(totalPrice);
    setDiscount(DiscountPrice);
  };

  const DaleteItem = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res1 = await remove_to_cart(id);
        getData();
        const res = await get_products_quantity();
        context.isAdd_To_Cart_State(res);
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: error,
          position: 'bottom',
          swipeable: true,
          autoHide: false,
        });
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
  const addQuantity = async (id: any) => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res = await add_to_Cart_Quantity(id);
        const res1 = await get_cart_products();
        TotalPrice(res1);
        const res2 = await get_products_quantity();
        context.isAdd_To_Cart_State(res2);
        setData(res1);
      } catch (error: any) {
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
  const removeQuantity = async (id: any) => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res = await remove_to_cartQuantity(id);
        const res1 = await get_cart_products();
        TotalPrice(res1);
        const res2 = await get_products_quantity();
        context.isAdd_To_Cart_State(res2);
        setData(res1);
      } catch (error: any) {
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
  return (
    <View>
      {loading ? (
        <View style={style.mainContainer}>
          <Loader />
        </View>
      ) : (
        <ScrollView style={style.mainContainer}>
          <Text style={style.MinText}>Shopping Cart</Text>
          {data?.cartProduct?.length > 0 ? (
            <>
              {data?.cartProduct?.map((val: any, index: any) => (
                <View key={index} style={style.cartContainer}>
                  <Image source={{uri: val.image}} style={style.img} />
                  <View style={{flex:1}}>
                    <View style={style.wishlistContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          setId(val.cartId), setIsVisible(true);
                        }}>
                        <Image
                          source={require('../../assets/images/cross.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={style.productNameText} numberOfLines={1}>
                      {val.productName}
                    </Text>
                    <Text style={style.Price}>Rs: {val.discountPrice}</Text>
                    {val.discountPrice > 0 && (
                      <View style={style.rowContainer}>
                        <Text style={style.DiccountText}>Rs: {val.price}</Text>
                        <Text style={style.DiccountOffText}>
                          {val.discount}% Off
                        </Text>
                      </View>
                    )}
                    <View style={style.quantityContainer}>
                      <Text style={style.highlightText}>Quantity </Text>
                      <TouchableOpacity
                        onPress={() => {
                          if (val.quantity > 0) {
                            removeQuantity(val.productId);
                          }
                        }}>
                        <Text
                          style={[
                            style.highlightText,
                            {
                              fontWeight: '800',
                              fontSize: Theme.fontSize.size18,
                            },
                          ]}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <View style={style.quantityBox}>
                        <Text style={[style.highlightText, {marginTop: -1}]}>
                          {val.quantity}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          if (val.quantity < val.productQuantity) {
                            addQuantity(val.productId);
                          }
                        }}>
                        <Text
                          style={[
                            style.highlightText,
                            {
                              fontWeight: '800',
                              fontSize: Theme.fontSize.size16,
                            },
                          ]}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={style.highlightText}>
                        Total Price: {val.totalPrice}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <View style={{alignItems: 'center', rowGap: Theme.fontSize.size10}}>
              <Text style={style.emptyText}>Your Cart is empty.</Text>
              <Text style={style.addText}>
                {'Add something to make me happy :)'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  nav.goBack();
                }}>
                <Text style={style.btn}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          )}
          <PopUp
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            functionCall={DaleteItem}
            type={'warnning'}
            lebel={'That you want to delete this product from cart?'}
            btnLebel={'Yes, delete it!'}
          />
        </ScrollView>
      )}
    </View>
  );
}
