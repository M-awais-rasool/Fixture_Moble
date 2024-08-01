import {View, Text, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from './style';
import TextInputs from '../../component/textInput/TextInputs';
import DropDown from '../../component/dropDown/DropDown';
import {RadioButton} from 'react-native-paper';
import Buttons from '../../component/buttons/Buttons';
import Theme from '../../theme/Theme';
import {
  Sindh,
  balochistanCities,
  islamabadAreas,
  kpkCities,
  punjab,
} from '../../listOfData/ListOfData';
import {
  get_default_Shipping_address,
  get_product_order_summary,
} from '../../api/services/Get';
import PopUp from '../../component/popUp/PopUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loader from '../../component/loader/Loader';
import {isNetworkAvailable} from '../../api/Api';
import Toast from 'react-native-toast-message';
import {add_order} from '../../api/services/Post';

export default function BuyNow() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [addressData, setAddressData] = useState<any>();
  const [cityData, setCityData] = useState<any>([]);
  const [stateLebel, setStateLebel] = useState('Select Your State');
  const [cityLebel, setCityLebel] = useState('Select Your City');
  const emailValidation = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{3,6}$/;
  const [checked, setChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [summaryData, setSummaryData] = useState<any>();
  const nav: any = useNavigation();
  const Route: any = useRoute();
  const [loading, setLoading] = useState(false);

  const data = [
    'Punjab',
    'Sindh',
    'Balouchistan',
    'Khyber Pakhtunkhwa',
    'Islamabad Capital Territory',
  ];
  const checkCity = () => {
    if (stateLebel == 'Punjab') {
      setCityData(punjab);
    } else if (stateLebel == 'Sindh') {
      setCityData(Sindh);
    } else if (stateLebel == 'Balouchistan') {
      setCityData(balochistanCities);
    } else if (stateLebel == 'Khyber Pakhtunkhwa') {
      setCityData(kpkCities);
    } else if (stateLebel == 'Islamabad Capital Territory') {
      setCityData(islamabadAreas);
    }
  };
  const getAddress = async () => {
    setLoading(true);
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res = await get_default_Shipping_address();
        setAddressData(res);
        const res1 = await get_product_order_summary(
          Route.params.Id,
          Route.params.Quantity,
        );
        setSummaryData(res1.data);
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
  useEffect(() => {
    getAddress();
  }, []);
  const onCheck = async () => {
    let Token: any = await AsyncStorage.getItem('token');
    if (Token) {
      setChecked(!checked);
      if (addressData == null && checked == false) {
        setIsVisible(true);
      }
    } else {
      nav.navigate('SignIn');
    }
  };
  const sendOrder = async () => {
    const data = {
      quantity: Route.params.Quantity,
      comment: comment,
      city: checked ? addressData?.city : cityLebel,
      address: checked ? addressData?.address : stateLebel,
      phoneNo: checked ? addressData?.phoneNo : phoneNo,
      firstName: checked ? addressData?.firstName : name,
      email: checked ? addressData?.email : email,
      shippedOnDefaultAddress: checked ? true : false,
    };
    const res = await add_order(Route.params.Id, data);
    if (res.status == 'Success') {
      Toast.show({
        type: 'success',
        text1: res.message + '.😍',
        visibilityTime: 2500,
      });
      nav.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
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
        <>
          <View style={style.Contianer}>
            <View>
              <Text style={[style.mainTextHeading]}>
                Add Your Shipping Address
              </Text>
              <View
                style={[
                  style.flexRow,
                  {
                    justifyContent: 'flex-start',
                    gap: Theme.fontSize.size10,
                    marginTop: Theme.fontSize.size5,
                  },
                ]}>
                <RadioButton
                  color={'#F29900'}
                  value="first"
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    onCheck();
                  }}
                />
                <Text style={{color: Theme.colors.black}}>
                  Place Order with Default Address
                </Text>
              </View>
              <View style={{rowGap: Theme.fontSize.size10}}>
                <TextInputs
                  lebel={'Name'}
                  placeholder={'Enter Your Name'}
                  onChange={setName}
                  value={checked ? addressData?.firstName : name}
                  readOnly={checked ? true : false}
                  style={checked && {opacity: 0.5}}
                />
                <TextInputs
                  lebel={'Email'}
                  placeholder={'Enter Your e-mail'}
                  onChange={setEmail}
                  value={checked ? addressData?.email : email}
                  readOnly={checked ? true : false}
                  style={checked && {opacity: 0.5}}
                />
                {checked == true ||
                email == '' ||
                email.match(emailValidation) ? (
                  ''
                ) : (
                  <Text style={style.emailError}>Email is not valid</Text>
                )}
                {checked == false && (
                  <>
                    <DropDown
                      Textlebel={'Select Your State'}
                      Data={data}
                      checkCity={checkCity}
                      setLebel={setStateLebel}
                      setLebel2={setCityLebel}
                      lebel={stateLebel}
                      type={'state'}
                      style={checked && {opacity: 0.5}}
                      disable={checked && true}
                    />
                  </>
                )}

                <DropDown
                  Textlebel={checked ? 'Address' : 'Select Your City'}
                  Data={cityData}
                  checkCity={checkCity}
                  setLebel={setCityLebel}
                  lebel={checked ? addressData?.city : cityLebel}
                  style={
                    checked && {
                      opacity: 0.6,
                      marginBottom: -Theme.fontSize.size20,
                    }
                  }
                  disable={checked && true}
                />
                <TextInputs
                  lebel={checked == false && 'Full Address'}
                  placeholder={'Enter Your Full Address'}
                  onChange={setShippingAddress}
                  value={
                    checked
                      ? addressData?.city + ' ' + addressData?.address
                      : shippingAddress
                  }
                  readOnly={checked ? true : false}
                  style={checked && {opacity: 0.5}}
                />
                <TextInputs
                  lebel={'Phone No'}
                  placeholder={'Enter Your Phone No'}
                  onChange={setPhoneNo}
                  value={checked ? addressData?.phoneNo : phoneNo}
                  keyboardType={'numeric'}
                  maxLength={11}
                  readOnly={checked ? true : false}
                  style={checked && {opacity: 0.5}}
                />
                {checked == true || phoneNo == '' || phoneNo.length > 10 ? (
                  ''
                ) : (
                  <Text style={style.emailError}>
                    Please Enter Valid Phone No
                  </Text>
                )}
                <TextInputs
                  lebel={'Comment'}
                  placeholder={'Something about Product'}
                  onChange={setComment}
                  value={comment}
                  multiline={true}
                  style={{height: 60, textAlignVertical: 'top'}}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                {checked == false ? (
                  name != '' &&
                  email != '' &&
                  phoneNo.length > 10 &&
                  email.match(emailValidation) &&
                  stateLebel != 'Select Your State' &&
                  cityLebel != 'Select Your City' ? (
                    <Buttons
                      title={'Place Order'}
                      onPress={() => {
                        sendOrder();
                      }}
                      style={{paddingHorizontal: Theme.fontSize.size30}}
                    />
                  ) : (
                    <Buttons
                      disabled={true}
                      title={'Place Order'}
                      style={{
                        paddingHorizontal: Theme.fontSize.size30,
                        backgroundColor: 'gray',
                      }}
                    />
                  )
                ) : (
                  <Buttons
                    title={'Place Order'}
                    onPress={() => {
                      sendOrder();
                    }}
                    style={{paddingHorizontal: Theme.fontSize.size30}}
                  />
                )}
              </View>
            </View>
            <PopUp
              setIsVisible={setIsVisible}
              isVisible={isVisible}
              type={'shippingAddress'}
            />
          </View>
          <View style={[style.Contianer, {marginTop: Theme.fontSize.size10}]}>
            <Text style={[style.mainTextHeading]}>Order Summary</Text>
            <View style={style.oderFlexRow}>
              <View style={{flex: 1}}>
                <Image source={{uri: summaryData?.image}} style={style.img} />
              </View>
              <View style={{flex: 1}}>
                <Text style={style.oderName} numberOfLines={1}>
                  {summaryData?.name}
                </Text>
                <Text style={style.quantityName}>
                  Quantity: {Route.params.Quantity}
                </Text>
              </View>
            </View>
            <View style={style.line} />
            <View style={[style.oderFlexRow, {marginBottom: -7}]}>
              <Text style={style.quantityName}>Subtotal</Text>
              <Text style={style.quantityName}>
                Rs: {summaryData?.subtotal}
              </Text>
            </View>
            <View style={[style.oderFlexRow, {marginBottom: -7}]}>
              <Text style={style.quantityName}>Discount</Text>
              <Text style={style.quantityName}>
                Rs: {summaryData?.discountPrice}
              </Text>
            </View>
            <View style={style.oderFlexRow}>
              <Text style={style.quantityName}>Shipping</Text>
              <Text style={style.quantityName}>
                Rs: {summaryData?.shippingInString}
              </Text>
            </View>
            <View style={[style.line, {width: '80%', alignSelf: 'center'}]} />
            <View style={style.oderFlexRow}>
              <Text style={style.quantityName}>Total</Text>
              <Text style={style.quantityName}>Rs: {summaryData?.total}</Text>
            </View>
          </View>
        </>
      )}
      <View style={{marginBottom: 20}} />
    </ScrollView>
  );
}
