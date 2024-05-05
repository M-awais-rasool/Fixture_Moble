import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

export default function SignIn() {
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const nav: any = useNavigation();

  const login = async () => {
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
  };
  return (
    <ScrollView style={style.container}>
      <View style={style.imgContainer}>
        <Image source={require('../../assets/images/Logo.png')} />
      </View>
      <View style={style.InputContainer}>
        <View style={{marginTop: 50}} />
        <TextInputs
          lebel={'Phone No'}
          placeholder={'Phone No'}
          onChange={setPhoneNo}
          keyboardType={'numeric'}
          maxLength={11}
          value={phoneNo}
          icon={<Image source={require('../../assets/images/Phoneicon.png')} />}
        />
        <View style={{marginTop: 20}} />
        <TextInputs
          lebel={'Password'}
          placeholder={'Password'}
          onChange={setPassword}
          value={password}
          icon={<Image source={require('../../assets/images/password.png')} />}
        />
        <TouchableOpacity>
          <Text style={style.forgotText}>Forget?</Text>
        </TouchableOpacity>
        <Buttons
          title={'Login'}
          onPress={() => {
            login();
          }}
        />
        <Text style={style.orText}>Or</Text>
        <GoogleBtn lebel={'Continue with Google'} />
        <Text style={style.CreateAccText}>
          Create account?{' '}
          <TouchableWithoutFeedback
            onPress={() => {
              nav.navigate('SignUp');
            }}>
            <Text style={[style.CreateAccText, {color: '#F29900'}]}>
              Sign up
            </Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </ScrollView>
  );
}
