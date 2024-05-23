import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  get_Shipping_address,
  get_default_Shipping_address,
  get_products,
} from '../../api/services/Get';
import {useNavigation, useRoute} from '@react-navigation/native';
import style from './style';
import Theme from '../../theme/Theme';
import {TouchableOpacity} from 'react-native';
import {add_to_Cart, add_to_WishList} from '../../api/services/Post';
import Toast from 'react-native-toast-message';
import {remove_to_WishList} from '../../api/services/Delete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../component/loader/Loader';
import {useGlobalContext} from '../../component/context.tsx/Context';
import Buttons from '../../component/buttons/Buttons';
import PopUp from '../../component/popUp/PopUp';
import {update_shipping_Address} from '../../api/services/Put';
import {isNetworkAvailable} from '../../api/Api';
const windowWidth = Dimensions.get('window').width;

export default function Product_Details() {
  const Route: any = useRoute();
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [mainImg, setMainImg] = useState<any>();
  const nav: any = useNavigation();
  const context: any = useGlobalContext();
  const regex = /(<([^>]+)>)/gi;
  const [isVisible, setIsVisible] = useState(false);
  const [adressData, setAddressData] = useState([]);
  const [addressId, setAdressId] = useState('');
  const [defualtAddress, setDefualAddress] = useState<any>();

  useEffect(() => {
    getData();
    getAddress();
  }, []);
  const getData = async () => {
    setLoading(true);
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const getProduct: any = await get_products(Route.params.Id);
        console.log(getProduct);
        setData(getProduct);
        getProduct?.productMedias?.map((val: any, index: any) => {
          if (index < 1) {
            setMainImg(val.imgUrl);
          } else if (val.isThumbNail == true) {
            setMainImg(null);
            setMainImg(val.imgUrl);
          }
        });
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
  //waish list
  const addToWishList = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      let token = await AsyncStorage.getItem('token');
      if (token) {
        if (data?.isInWishList) {
          const res = await remove_to_WishList(data?.productId);
          if (res.status == 200) {
            getData();
            Toast.show({
              type: 'success',
              text1: res.data.message + '.😒',
              visibilityTime: 2000,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: res.data.message,
              visibilityTime: 3000,
            });
          }
        } else {
          const res = await add_to_WishList(data?.productId);
          if (res.status == 200) {
            getData();
            Toast.show({
              type: 'success',
              text1: res.data.message + '.😍',
              visibilityTime: 2000,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: res.data.message,
              visibilityTime: 3000,
            });
          }
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
  // add To cart
  const addToCart = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      let token = await AsyncStorage.getItem('token');
      if (token) {
        const res: any = await add_to_Cart(data?.productId, quantity);
        if (res.status == 200) {
          context.isAdd_To_Cart_State(context.addToCartState + quantity);
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
  const getAddress = async () => {
    const res = await get_Shipping_address();
    const res1 = await get_default_Shipping_address();
    setDefualAddress(res1);
    setAddressData(res);
  };
  const updateAddress = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res = await update_shipping_Address(addressId);
        getAddress();
      } catch (error) {}
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
    <>
      {loading ? (
        <View style={style.mainContainer}>
          <Loader />
        </View>
      ) : (
        <ScrollView style={style.mainContainer}>
          <View style={style.Contianer}>
            <Image source={{uri: mainImg}} style={style.mainImg} />
            <View
              style={[
                style.deliveryContainer,
                {
                  gap: Theme.fontSize.size15,
                  marginTop: Theme.fontSize.size10,
                  flexWrap: 'wrap',
                },
              ]}>
              {data?.productMedias?.map(
                (val: any, index: any) =>
                  val.isThumbNail == null && (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setMainImg(val.imgUrl);
                      }}>
                      <Image
                        source={{uri: val.imgUrl}}
                        style={{
                          width: Theme.fontSize.size70,
                          height: Theme.fontSize.size70,
                          borderRadius: Theme.fontSize.size10,
                        }}
                      />
                    </TouchableOpacity>
                  ),
              )}
            </View>
            <Text style={style.mainTextHeading}>{data?.productName}</Text>
            <Text style={style.highlightText}>Highlight's</Text>
            <Text
              style={[style.highlightText, {fontSize: Theme.fontSize.size12}]}>
              {data?.highLight?.replace(regex, '')}
            </Text>
            <View style={style.line} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={style.Price}>Rs: {data?.discountPrice}</Text>
              <View style={{flexDirection: 'row', gap: Theme.fontSize.size10}}>
                <TouchableOpacity onPress={() => addToWishList()}>
                  {data?.isInWishList ? (
                    <Image
                      source={require('../../assets/images/favourite1.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/favourite.png')}
                    />
                  )}
                </TouchableOpacity>
                {data?.quantity > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      addToCart();
                    }}>
                    <Image
                      source={require('../../assets/images/add-shopping-cart.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {data?.discountPrice > 0 && (
              <View style={style.rowContainer}>
                <Text style={style.DiccountText}>Rs: {data?.price}</Text>
                <Text style={style.DiccountOffText}>{data?.discount}% Off</Text>
              </View>
            )}
            {data?.quantity > 0 ? (
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Text style={style.highlightText}>Quantity: </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}>
                  <Text
                    style={[
                      style.highlightText,
                      {fontWeight: '800', fontSize: Theme.fontSize.size18},
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
                    if (quantity < data?.quantity) {
                      setQuantity(quantity + 1);
                    }
                  }}>
                  <Text
                    style={[
                      style.highlightText,
                      {fontWeight: '800', fontSize: Theme.fontSize.size16},
                    ]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={[style.DiccountOffText, {textAlign: 'center'}]}>
                Out of Stock
              </Text>
            )}
            {data?.quantity > 0 && (
              <View style={{alignItems: 'center'}}>
                <Buttons
                  title={'Buy Now'}
                  onPress={() => {
                    nav.navigate('BuyNow', {
                      Id: data?.productId,
                      Quantity: quantity,
                    });
                  }}
                />
              </View>
            )}
          </View>
          <View style={{marginBottom: 10}} />
          <View style={style.Contianer}>
            <Text style={style.deliveryText}>Delivery</Text>
            <View style={style.deliveryContainer}>
              <View style={{width: '50%'}}>
                <View style={style.deliveryInnerContainer1}>
                  <Image
                    source={require('../../assets/images/location.png')}
                    style={{marginTop: Theme.fontSize.size20}}
                  />
                  {defualtAddress != null && (
                    <Text style={[style.Price]} numberOfLines={1}>
                      {defualtAddress?.city + ' ' + defualtAddress?.address}
                    </Text>
                  )}
                </View>
                <View
                  style={[
                    {
                      alignItems: 'center',
                      marginTop: -Theme.fontSize.size10,
                    },
                    defualtAddress == null && {
                      marginTop: -Theme.fontSize.size55,
                    },
                  ]}>
                  <Buttons
                    title={'Change Location'}
                    onPress={() => {
                      setIsVisible(true);
                    }}
                  />
                </View>
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
            {data?.warranty > 0 && (
              <View>
                <Text
                  style={[style.Price, {textAlign: 'center', marginTop: 10}]}>
                  Service{'   '}1 Year Brand Warranty
                </Text>
              </View>
            )}
          </View>
          <View style={{marginBottom: 10}} />
          <View style={style.Contianer}>
            <Text style={style.deliveryText}>Product Description</Text>
            <Text style={style.Price}>
              {data?.description?.replace(regex, '')}
            </Text>
            {data?.descriptionMedias?.map((val: any, index: any) => (
              <View key={index}>
                <Image
                  source={{uri: val.imgUrl}}
                  style={[style.mainImg, {marginTop: Theme.fontSize.size10}]}
                />
              </View>
            ))}
          </View>
          <PopUp
            setIsVisible={setIsVisible}
            isVisible={isVisible}
            type={'location'}
            data={adressData}
            setAdressId={setAdressId}
            functionCall={updateAddress}
          />
          <View style={{marginBottom: 50}} />
        </ScrollView>
      )}
    </>
  );
}
