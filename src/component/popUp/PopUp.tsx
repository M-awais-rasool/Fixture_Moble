import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useState} from 'react';
import style from './style';
import {Overlay} from 'react-native-elements';
import TextInputs from '../textInput/TextInputs';
import Buttons from '../buttons/Buttons';
import Theme from '../../theme/Theme';
import LottieView from 'lottie-react-native';
import {ScrollView} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

interface popUpProps {
  isVisible?: boolean;
  type?: string;
  btnLebel?: string;
  data?: any;
  lebel?: string;
  setIsVisible: (i: boolean) => void;
  setAdressId?: (i: any) => void;
  functionCall?: () => void;
}

export default function PopUp(props: popUpProps) {
  const nav: any = useNavigation();
  const changeAddress = (id: any) => {
    for (let i = 0; i < props?.data?.length; i++) {
      if (props.data[i].shippingAddressId == id) {
        props.data[i].status = true;
        props.setAdressId?.(id);
      } else {
        props.data[i].status = false;
      }
    }
  };
  return (
    <Overlay isVisible={props.isVisible}>
      <View
        style={[
          style.modalContainer,
          props.type == 'warnning'
            ? {
                width: windowWidth / 1.5,
                minHeight: windowWidth / 1.6,
              }
            : props.type == 'location'
            ? {width: windowWidth / 1.2, minHeight: windowHeight / 5.5}
            : props.type == 'shippingAddress' && {
                width: windowWidth / 1.7,
                minHeight: windowWidth / 3.2,
              },
        ]}>
        {props.type == 'warnning' ? (
          <View>
            <LottieView
              source={require('../../assets/warnning.json')}
              autoPlay
              style={style.loading}
              loop={false}
            />
            <Text style={style.sureText}>Are you sure?</Text>
            <Text
              style={[
                style.sureText,
                {
                  fontSize: Theme.fontSize.size14,
                  fontWeight: '500',
                  marginTop: Theme.fontSize.size10,
                },
              ]}>
              {props.lebel}
            </Text>
            <View style={style.flexRow}>
              <Buttons
                title={props.btnLebel}
                onPress={() => {
                  props.functionCall?.();
                  props.setIsVisible(false);
                }}
                style={style.removeBtn}
              />
              <Buttons
                title={'Cancel'}
                onPress={() => {
                  props.setIsVisible(false);
                }}
                style={[
                  style.removeBtn,
                  {
                    backgroundColor: Theme.colors.redColor,
                    borderColor: Theme.colors.redColor,
                  },
                ]}
              />
            </View>
          </View>
        ) : props.type == 'shippingAddress' ? (
          <View>
            <Text style={style.sureText}>Opps!</Text>
            <Text
              style={[
                style.sureText,
                {
                  fontSize: Theme.fontSize.size14,
                  fontWeight: '500',
                  marginTop: Theme.fontSize.size10,
                },
              ]}>
              You don't have any default shipping address :😢
            </Text>
            <View style={{alignItems: 'center'}}>
              <Buttons
                title={'Ok'}
                style={style.removeBtn}
                onPress={() => {
                  props.setIsVisible(false);
                }}
              />
            </View>
          </View>
        ) : props.type == 'location' ? (
          <ScrollView>
            <Text style={style.sureText}>Your Address</Text>
            <View style={{alignSelf: 'flex-end'}}>
              <Buttons
                title={'Add'}
                onPress={() => {
                  props.setIsVisible(false);
                  nav.navigate('UserProfile', {Btn: 4});
                }}
                style={style.cancelBtn}
              />
            </View>
            <ScrollView style={{minHeight: 20, maxHeight: 120}}>
              {props?.data?.map((val: any, index: any) => (
                <View style={style.addressContainer}>
                  <View style={{alignItems: 'flex-end'}}>
                    <RadioButton
                      color={'#F29900'}
                      value="first"
                      status={val.status ? 'checked' : 'unchecked'}
                      onPress={() => changeAddress(val.shippingAddressId)}
                    />
                  </View>
                  <Text
                    style={[
                      style.sureText,
                      {
                        fontSize: Theme.fontSize.size14,
                        fontWeight: '500',
                        marginTop: Theme.fontSize.size10,
                      },
                    ]}>
                    {val.city + ' ' + val.address}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <View style={style.flexRow}>
              {props?.data?.length > 0 && (
                <Buttons
                  title={'Save'}
                  onPress={() => {
                    props.functionCall?.();
                    props.setIsVisible(false);
                  }}
                  style={style.updateBtn}
                />
              )}
              <Buttons
                title={'Cancel'}
                onPress={() => {
                  props.setIsVisible(false);
                }}
                style={style.cancelBtn}
              />
            </View>
          </ScrollView>
        ) : (
          <>
            <View style={style.modalInnerContainer}>
              <Text style={style.passwordText}>Password Update</Text>
            </View>
            <View style={{rowGap: 12, marginTop: 15}}>
              <TextInputs
                lebel={'Old Password'}
                placeholder={'Enter previous password'}
              />
              <TextInputs
                lebel={'New Password'}
                placeholder={'Enter new password'}
              />
              <TextInputs
                lebel={'Confirm New Password'}
                placeholder={'Enter Confirm password'}
              />
            </View>
            <View style={style.flexRow}>
              <Buttons
                title={'Update'}
                onPress={() => {}}
                style={style.updateBtn}
              />
              <Buttons
                title={'Cancel'}
                onPress={() => {
                  props.setIsVisible(false);
                }}
                style={style.cancelBtn}
              />
            </View>
          </>
        )}
      </View>
    </Overlay>
  );
}
