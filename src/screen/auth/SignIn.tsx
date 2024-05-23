import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import style from './AuthStyle';
import TextInputs from '../../component/textInput/TextInputs';
import Buttons from '../../component/buttons/Buttons';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GoogleBtn from '../../component/buttons/GoogleBtn';
import {Login} from '../../api/services/Post';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isNetworkAvailable} from '../../api/Api';
import Theme from '../../theme/Theme';

export default function SignIn() {
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const nav: any = useNavigation();
  const [seacure, setseacure] = useState(true);
  const login = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        let data = {
          password: password,
          phone: phoneNo,
        };
        const login_res = await Login(data);
        if (login_res.status == 200) {
          await AsyncStorage.setItem('token', login_res.data.token);
          setPassword('');
          setPhoneNo('');
          nav.replace('BottomTabs');
          Toast.show({
            type: 'success',
            text1: 'Login Successfully',
            visibilityTime: 3000,
          });
        } else if (login_res.data.status == 401) {
          Toast.show({
            type: 'error',
            text1: 'Invalid Phone No or Passowrd',
            visibilityTime: 3000,
          });
        }
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
    <ScrollView style={style.container}>
      <View style={style.imgContainer}>
        <Pressable
          onPress={() => {
            nav.navigate('BottomTabs');
          }}>
          <Image source={require('../../assets/images/Logo.png')} />
        </Pressable>
      </View>
      <View style={style.InputContainer}>
        <View style={{marginTop: Theme.fontSize.size50}} />
        <TextInputs
          lebel={'Phone No'}
          placeholder={'Phone No'}
          onChange={setPhoneNo}
          keyboardType={'numeric'}
          maxLength={11}
          value={phoneNo}
          icon={<Image source={require('../../assets/images/Phoneicon.png')} />}
        />
        <View style={{marginTop: Theme.fontSize.size20}} />
        <TextInputs
          lebel={'Password'}
          placeholder={'Password'}
          onChange={setPassword}
          value={password}
          secureTextEntry={seacure}
          icon={
            <TouchableOpacity
              onPress={() => {
                setseacure(pre => !pre);
              }}>
              {seacure ? (
                <Image
                  source={require('../../assets/images/eye1.png')}
                  style={{tintColor: 'black'}}
                />
              ) : (
                <Image
                  source={require('../../assets/images/eye2.png')}
                  style={{tintColor: 'black'}}
                />
              )}
            </TouchableOpacity>
          }
        />
        {phoneNo == '' || password == '' ? (
          <Buttons
            style={{backgroundColor: Theme.colors.disable}}
            disabled={true}
            title={'Login'}
            onPress={() => {
              login();
            }}
          />
        ) : (
          <Buttons
            title={'Login'}
            onPress={() => {
              login();
            }}
          />
        )}
        <Text style={style.orText}>Or</Text>
        <GoogleBtn lebel={'Continue with Google'} />
        <Text style={style.CreateAccText}>
          Create account?{' '}
          <TouchableWithoutFeedback
            onPress={() => {
              nav.navigate('SignUp');
            }}>
            <Text style={[style.CreateAccText, {color: Theme.colors.BtnColor}]}>
              Sign up
            </Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </ScrollView>
  );
}
