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
    setLoading(true);
    const res = await get_cart_products();
    setData(res);
    TotalPrice(res);
    setLoading(false);
  };
  const TotalPrice = (data: any) => {
    setSubtotal(0);
    setDiscount(0);
    setTotal(0);
    setTimeout(() => {
      data?.cartProduct?.map((val: any) => {
        setSubtotal(val.totalDiscountPrice + subtotal);
        setTotal(val.totalPrice + total);
        setDiscount(total - subtotal);
      });
    }, 2000);
  };

  const DaleteItem = async () => {
    const res = await remove_to_cart(id);
    if (res.status == 200) {
      getData();
      const res = await get_products_quantity();
      context.isAdd_To_Cart_State(res);
    } else {
      console.log('cart Error' + res.status);
    }
  };
  const addQuantity = async (id: any) => {
    const res = await add_to_Cart_Quantity(id);
    if (res.status == 200) {
      const res1 = await get_cart_products();
      TotalPrice(res1);
      const res2 = await get_products_quantity();
      context.isAdd_To_Cart_State(res2);
      setData(res1);
    }
  };
  const removeQuantity = async (id: any) => {
    const res = await remove_to_cartQuantity(id);
    if (res.status == 200) {
      const res1 = await get_cart_products();
      TotalPrice(res1);
      const res2 = await get_products_quantity();
      context.isAdd_To_Cart_State(res2);
      setData(res1);
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
                  <View style={{width: '100%'}}>
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
              <View style={[style.cartContainer, {flexDirection: 'column'}]}>
                <Text
                  style={[style.MinText, {textAlign: 'center', marginTop: 0}]}>
                  Cart Summary
                </Text>
                <View style={style.flexRow}>
                  <Text style={style.highlightText}>Subtotal</Text>
                  <Text style={style.Price}>Rs: {subtotal}</Text>
                </View>
                <View style={style.flexRow}>
                  <Text style={style.highlightText}>Discount</Text>
                  <Text style={style.Price}>Rs: {discount}</Text>
                </View>
                <View style={style.line} />
                <View style={style.flexRow}>
                  <Text style={style.highlightText}>Total</Text>
                  <Text style={style.Price}>Rs: {total}</Text>
                </View>
                <Buttons title={'Proceed to checkout'} onPress={() => {}} />
              </View>
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
