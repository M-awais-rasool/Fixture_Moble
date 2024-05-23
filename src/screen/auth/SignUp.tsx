import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import style from './AuthStyle';
import {useNavigation} from '@react-navigation/native';
import TextInputs from '../../component/textInput/TextInputs';
import Buttons from '../../component/buttons/Buttons';
import GoogleBtn from '../../component/buttons/GoogleBtn';
import Theme from '../../theme/Theme';
import {isNetworkAvailable} from '../../api/Api';
import Toast from 'react-native-toast-message';
import {userCreate} from '../../api/services/Post';
const windowWidth = Dimensions.get('window').width;

export default function SignUp() {
  const passwordValidation =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const nav: any = useNavigation();

  const singUp = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      let data = {
        firstname: fname,
        lastname: lname,
        password: password,
        phoneNumber: phoneNo,
      };
      userCreate(data).then(res => {
        if (res.data.status === 'Success') {
          Toast.show({
            type: 'success',
            text1: 'Create Account Successfuly',
            position: 'top',
            swipeable: true,
            visibilityTime: 3000,
          });
          setFName('');
          setLName('');
          setPassword('');
          setConfirmPassword('');
          setPhoneNo('');
          nav.navigate('SignIn');
        } else if (
          res.data.status == 401 ||
          res.data.status == 401 ||
          res.data.status == 500
        ) {
          Toast.show({
            type: 'error',
            text1: res.data.message,
            position: 'top',
            swipeable: true,
            visibilityTime: 3000,
          });
        }
      });
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
        <Image source={require('../../assets/images/Logo.png')} />
      </View>
      <View style={style.InputContainer}>
        <View style={{marginTop: Theme.fontSize.size50}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInputs
            onChange={(e: any) => {
              setFName(e);
            }}
            lebel={'First Name'}
            placeholder={'First Name'}
            style={{width: windowWidth / 2.7}}
            icon={
              <Image source={require('../../assets/images/usericon.png')} />
            }
          />
          <TextInputs
            onChange={(e: any) => {
              setLName(e);
            }}
            lebel={'Last Name'}
            placeholder={'Last Name'}
            style={{width: windowWidth / 2.7}}
            icon={
              <Image source={require('../../assets/images/usericon.png')} />
            }
          />
        </View>
        <View style={{marginTop: Theme.fontSize.size20}} />
        <TextInputs
          onChange={(e: any) => {
            setPhoneNo(e);
          }}
          maxLength={11}
          lebel={'Phone No'}
          placeholder={'Phone No'}
          icon={<Image source={require('../../assets/images/Phoneicon.png')} />}
        />
        <View style={{marginTop: Theme.fontSize.size20}} />
        <TextInputs
          onChange={(e: any) => {
            setPassword(e);
          }}
          lebel={'Password'}
          placeholder={'Password'}
          secureTextEntry={showPassword}
          icon={
            <TouchableOpacity
              onPress={() => {
                setShowPassword(pre => !pre);
              }}>
              {showPassword ? (
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
        {password == '' || password.match(passwordValidation) ? (
          ''
        ) : (
          <Text style={{color: 'red', fontSize: 13, paddingLeft: 10}}>
            Password must be 8 characters long containing at least 1 lowercase,
            1 uppercase, 1 number and 1 special character.
          </Text>
        )}
        <View style={{marginTop: Theme.fontSize.size20}} />
        <TextInputs
          onChange={(e: any) => {
            setConfirmPassword(e);
          }}
          lebel={'Confirm Password'}
          placeholder={'Confirm Password'}
          secureTextEntry={showConfirmPassword}
          icon={
            <TouchableOpacity
              onPress={() => {
                setShowConfirmPassword(pre => !pre);
              }}>
              {showConfirmPassword ? (
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
        {confirmPassword == '' || confirmPassword == password ? (
          ''
        ) : (
          <Text style={{color: 'red', fontSize: 13, paddingLeft: 10}}>
            Password Doesn't Match!
          </Text>
        )}
        <View style={{marginTop: Theme.fontSize.size10}} />
        {password.match(passwordValidation) &&
        confirmPassword == password &&
        fname != '' &&
        phoneNo != '' &&
        lname != '' ? (
          <Buttons
            title={'Sign up'}
            onPress={() => {
              singUp();
            }}
          />
        ) : (
          <Buttons
            disabled={true}
            style={{backgroundColor: 'gray'}}
            title={'Sign up'}
          />
        )}
        <Text style={style.orText}>Or</Text>
        <GoogleBtn lebel={'Continue with Google'} />
        <Text style={style.CreateAccText}>
          Back to{' '}
          <TouchableWithoutFeedback
            onPress={() => {
              nav.navigate('SignIn');
            }}>
            <Text style={[style.CreateAccText, {color: Theme.colors.BtnColor}]}>
              Login
            </Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </ScrollView>
  );
}
