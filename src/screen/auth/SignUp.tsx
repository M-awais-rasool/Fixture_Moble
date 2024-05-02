import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import style from './AuthStyle';
import {useNavigation} from '@react-navigation/native';
import TextInputs from '../../component/textInput/TextInputs';
import Buttons from '../../component/buttons/Buttons';
import GoogleBtn from '../../component/buttons/GoogleBtn';

export default function SignUp() {
  const nav: any = useNavigation();
  return (
    <ScrollView style={style.container}>
      <View style={style.imgContainer}>
        <Image source={require('../../assets/images/Logo.png')} />
      </View>
      <View style={style.InputContainer}>
        <View style={{marginTop: 50}} />
        <TextInputs
          lebel={'Full Name'}
          placeholder={'Enter Your Full Name'}
          icon={<Image source={require('../../assets/images/usericon.png')} />}
        />
        <View style={{marginTop: 20}} />
        <TextInputs
          lebel={'E-mail'}
          placeholder={'Enter Your E-mail'}
          icon={<Image source={require('../../assets/images/email.png')} />}
        />
        <View style={{marginTop: 20}} />
        <TextInputs
          lebel={'Password'}
          placeholder={'Enter Your Password'}
          icon={<Image source={require('../../assets/images/email.png')} />}
        />
        <View style={{marginTop: 20}} />
        <TextInputs
          lebel={'Phone No'}
          placeholder={'Enter Your Phone No'}
          icon={<Image source={require('../../assets/images/Phoneicon.png')} />}
        />
        <View style={{marginTop:10}}/>
        <Buttons
          title={'Sign up'}
          onPress={() => {
            nav.navigate('Home');
          }}
        />
        <Text style={style.orText}>Or</Text>
        <GoogleBtn lebel={'Continue with Google'} />
        <Text style={style.CreateAccText}>
          Back to{' '}
          <TouchableWithoutFeedback
            onPress={() => {
              nav.navigate('SignIn');
            }}>
            <Text style={[style.CreateAccText, {color: '#F29900'}]}>Login</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </ScrollView>
  );
}
