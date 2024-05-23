import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Buttons from '../../../component/buttons/Buttons';
import style from './style';
import TextInputs from '../../../component/textInput/TextInputs';
import Theme from '../../../theme/Theme';
import DropDown from '../../../component/dropDown/DropDown';
import {RadioButton} from 'react-native-paper';
import {
  Sindh,
  balochistanCities,
  islamabadAreas,
  kpkCities,
  punjab,
} from '../../../listOfData/ListOfData';
import Toast from 'react-native-toast-message';
import {add_new_shipping_address} from '../../../api/services/Post';
import {get_Shipping_address} from '../../../api/services/Get';
import Loader from '../../../component/loader/Loader';
import {update_shipping_Address} from '../../../api/services/Put';
import {isNetworkAvailable} from '../../../api/Api';

export default function AddressInfo() {
  const emailValidation = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{3,6}$/;
  const [addressFlag, setAddressFlag] = useState(false);
  const [cityData, setCityData] = useState<any>([]);
  const [stateLebel, setStateLebel] = useState('Select Your State');
  const [cityLebel, setCityLebel] = useState('Select Your City');
  const [checked, setChecked] = useState(false);
  //getInputData
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [addressData, setAddressData] = useState([]);
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
  const sendAddress = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      if (
        name == '' ||
        email == '' ||
        phoneNo == '' ||
        shippingAddress == '' ||
        cityLebel == 'Select Your City'
      ) {
        Toast.show({
          type: 'error',
          text1: 'Please fill all fields',
          visibilityTime: 3000,
        });
      } else if (!email.match(emailValidation)) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Valid Email',
          visibilityTime: 3000,
        });
      } else if (phoneNo.length < 11) {
        Toast.show({
          type: 'error',
          text1: 'Please Enter Valid Phone No',
          visibilityTime: 3000,
        });
      } else {
        let data = {
          city: cityLebel,
          address: shippingAddress,
          phoneNo: phoneNo,
          firstName: name,
          email: email,
          status: checked,
        };
        const res = await add_new_shipping_address(data);
        if (res.data.status == 'Success') {
          setEmail('');
          setPhoneNo('');
          setShippingAddress('');
          setName('');
          setStateLebel('Select Your State');
          setCityLebel('Select Your City');
          getshippingAddress();
          setAddressFlag(false);
        }
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
  const getshippingAddress = async () => {
    setLoading(true);
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res = await get_Shipping_address();
        setAddressData(res);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
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
  useEffect(() => {
    getshippingAddress();
  }, []);

  const changeShippingAddress = async (id: any) => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res = await update_shipping_Address(id);
        const res1 = await get_Shipping_address();
        setAddressData(res1);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {loading ? (
        <View style={style.mainContainer}>
          <Loader />
        </View>
      ) : (
        <View style={style.Contianer}>
          {addressFlag ? (
            <View>
              <Text style={[style.mainTextHeading]}>
                Add Your Shipping Address
              </Text>
              <View style={{rowGap: Theme.fontSize.size10}}>
                <TextInputs
                  lebel={'Name'}
                  placeholder={'Enter Your Name'}
                  onChange={setName}
                  value={name}
                />
                <TextInputs
                  lebel={'Phone No'}
                  placeholder={'Enter Your Phone No'}
                  onChange={setPhoneNo}
                  value={phoneNo}
                  keyboardType={'numeric'}
                  maxLength={11}
                />
                <TextInputs
                  lebel={'Email'}
                  placeholder={'Enter Your e-mail'}
                  onChange={setEmail}
                  value={email}
                />
                {email == '' || email.match(emailValidation) ? (
                  ''
                ) : (
                  <Text style={style.emailError}>Email is not valid</Text>
                )}
                <DropDown
                  Textlebel={'Select Your State'}
                  Data={data}
                  checkCity={checkCity}
                  setLebel={setStateLebel}
                  setLebel2={setCityLebel}
                  lebel={stateLebel}
                  type={'state'}
                />
                <DropDown
                  Textlebel={'Select Your City'}
                  Data={cityData}
                  checkCity={checkCity}
                  setLebel={setCityLebel}
                  lebel={cityLebel}
                />
                <TextInputs
                  lebel={'Shipping Address'}
                  placeholder={'Enter Your Shipping Address'}
                  onChange={setShippingAddress}
                  value={shippingAddress}
                />
              </View>
              <View
                style={[
                  style.flexRow,
                  {
                    justifyContent: 'flex-start',
                    gap: Theme.fontSize.size10,
                    marginTop: Theme.fontSize.size5,
                    marginBottom: -Theme.fontSize.size15,
                  },
                ]}>
                <RadioButton
                  value="first"
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(!checked)}
                />
                <Text>Make default</Text>
              </View>
              <Buttons
                title={'Save'}
                onPress={() => {
                  sendAddress();
                }}
              />
            </View>
          ) : (
            <>
              <View style={style.flexRow}>
                <Text style={[style.mainTextHeading, {textAlign: 'left'}]}>
                  Address Management
                </Text>
                <Buttons
                  title={'Add New Address'}
                  style={{marginTop: 0}}
                  onPress={() => {
                    setAddressFlag(true);
                  }}
                />
              </View>
              {addressData.length < 1 ? (
                <View>
                  <Text style={[style.mainTextHeading, {marginTop: 10}]}>
                    You don't have any address yet !
                  </Text>
                  <Text style={style.mainTextHeading}>Add Address Now</Text>
                </View>
              ) : (
                addressData.map((val: any, index: any) => (
                  <View
                    style={[
                      style.Contianer,
                      {marginVertical: Theme.fontSize.size10},
                    ]}
                    key={index}>
                    <View style={{flexDirection: 'row', gap: 3}}>
                      <View>
                        <Text style={style.nameHeading}>Name:</Text>
                        <Text style={style.nameHeading}>Address:</Text>
                        <Text style={style.nameHeading}>Phone No:</Text>
                      </View>
                      <View>
                        <Text style={[style.nameHeading, {fontWeight: '400'}]}>
                          {val.firstName}
                        </Text>
                        <Text
                          style={[style.nameHeading, {fontWeight: '400'}]}
                          numberOfLines={2}>
                          Pakistan {val.city + ' ' + val.address}
                        </Text>
                        <Text style={[style.nameHeading, {fontWeight: '400'}]}>
                          {val.phoneNo}
                        </Text>
                      </View>
                    </View>
                    <View style={style.addressContainer}>
                      <Text style={style.nameHeading}>Default:</Text>
                      {val.status ? (
                        <Buttons
                          title={'Selected'}
                          disabled={true}
                          style={{marginTop: Theme.fontSize.size10}}
                        />
                      ) : (
                        <Buttons
                          title={'Select'}
                          style={style.statusFalseBtn}
                          onPress={() => {
                            changeShippingAddress(val.shippingAddressId);
                          }}
                        />
                      )}
                    </View>
                  </View>
                ))
              )}
            </>
          )}
        </View>
      )}
    </>
  );
}
