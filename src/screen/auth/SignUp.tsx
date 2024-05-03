import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React from 'react';
import style from './AuthStyle';
import {useNavigation} from '@react-navigation/native';
import TextInputs from '../../component/textInput/TextInputs';
import Buttons from '../../component/buttons/Buttons';
import GoogleBtn from '../../component/buttons/GoogleBtn';
const windowWidth = Dimensions.get('window').width;

export default function SignUp() {
  const nav: any = useNavigation();
  return (
    <ScrollView style={style.container}>
      <View style={style.imgContainer}>
        <Image source={require('../../assets/images/Logo.png')} />
      </View>
      <View style={style.InputContainer}>
        <View style={{marginTop: 50}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInputs
            lebel={'First Name'}
            placeholder={'First Name'}
            style={{width: windowWidth / 2.7}}
            icon={
              <Image source={require('../../assets/images/usericon.png')} />
            }
          />
          <TextInputs
            lebel={'Last Name'}
            placeholder={'Last Name'}
            style={{width: windowWidth / 2.7}}
            icon={
              <Image source={require('../../assets/images/usericon.png')} />
            }
          />
        </View>
        <View style={{marginTop: 20}} />
        <TextInputs
          lebel={'Phone No'}
          placeholder={'Phone No'}
          icon={<Image source={require('../../assets/images/Phoneicon.png')} />}
        />
        <View style={{marginTop: 20}} />
        <TextInputs
          lebel={'Password'}
          placeholder={'Password'}
          icon={<Image source={require('../../assets/images/password.png')} />}
        />
        <View style={{marginTop: 20}} />
        <TextInputs
          lebel={'Confirm Password'}
          placeholder={'Confirm Password'}
        />
        <View style={{marginTop: 10}} />
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
