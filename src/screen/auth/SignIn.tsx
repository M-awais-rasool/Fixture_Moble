import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import style from './AuthStyle';
import TextInputs from '../../component/textInput/TextInputs';
import Buttons from '../../component/buttons/Buttons';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GoogleBtn from '../../component/buttons/GoogleBtn';

export default function SignIn() {
  const nav: any = useNavigation();
  return (
    <ScrollView style={style.container}>
      <View style={style.imgContainer}>
        <Image source={require('../../assets/images/Logo.png')} />
      </View>
      <View style={style.InputContainer}>
        <View style={{marginTop: 50}} />
        <TextInputs
          lebel={'E-mail'}
          placeholder={'Enter Your E-mail'}
          icon={<Image source={require('../../assets/images/email.png')} />}
        />
        <View style={{marginTop: 20}} />
        <TextInputs
          lebel={'Password'}
          placeholder={'Enter Your Password'}
          icon={<Image source={require('../../assets/images/password.png')} />}
        />
        <TouchableOpacity>
          <Text style={style.forgotText}>Forget?</Text>
        </TouchableOpacity>
        <Buttons
          title={'Login'}
          onPress={() => {
            nav.navigate('Home');
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
