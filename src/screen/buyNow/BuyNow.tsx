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

export default function BuyNow() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
    const res = await get_default_Shipping_address();
    setAddressData(res);
    const res1 = await get_product_order_summary(
      Route.params.Id,
      Route.params.Quantity,
    );
    console.log(res1);
    setSummaryData(res1);
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
  return (
    <ScrollView style={style.mainContainer}>
      <View style={style.Contianer}>
        <View>
          <Text style={[style.mainTextHeading]}>Add Your Shipping Address</Text>
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
            {email == '' || email.match(emailValidation) ? (
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
                checked && {opacity: 0.6, marginBottom: -Theme.fontSize.size20}
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
          </View>
          <View style={{alignItems: 'center'}}>
            <Buttons
              title={'Placed Order'}
              onPress={() => {}}
              style={{paddingHorizontal: Theme.fontSize.size30}}
            />
          </View>
        </View>
        <PopUp
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          type={'shippingAddress'}
        />
      </View>
      <View style={[style.Contianer, {marginTop: Theme.fontSize.size10}]}>
        <Text style={[style.mainTextHeading]}>Oder Summary</Text>
        <View style={style.oderFlexRow}>
          <View>
            <Image source={{uri: summaryData?.image}} style={style.img} />
          </View>
          <View style={{marginLeft: -50}}>
            <Text style={style.oderName}>{summaryData?.name}</Text>
            <Text style={style.quantityName}>
              Quantity: {Route.params.Quantity}
            </Text>
          </View>
        </View>
        <View style={style.line} />
        <View style={[style.oderFlexRow, {marginBottom: -7}]}>
          <Text style={style.quantityName}>Subtotal</Text>
          <Text style={style.quantityName}>Rs: {summaryData?.subtotal}</Text>
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
      <View style={{marginBottom: 20}} />
    </ScrollView>
  );
}
