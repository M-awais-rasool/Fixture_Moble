import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import style from './style';
import Buttons from '../../../component/buttons/Buttons';
import Theme from '../../../theme/Theme';
import TextInputs from '../../../component/textInput/TextInputs';
import {getUserData} from '../../../api/services/Get';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUp from '../../../component/popUp/PopUp';

export default function UserProfile() {
  const [data, setdata] = useState<any>();
  const nav: any = useNavigation();
  const [token, setToken] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [btn, setBtn] = useState([
    {
      id: 1,
      name: 'My Profile',
      isActive: true,
    },
    {
      id: 2,
      name: 'My Returns',
      isActive: false,
    },
    {
      id: 3,
      name: 'My Cancellation',
      isActive: false,
    },
    {
      id: 4,
      name: 'My Address ',
      isActive: false,
    },
  ]);
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );
  const isActive = (itemId: any) => {
    for (let i = 0; i < btn?.length; i++) {
      if (btn[i].id == itemId) {
        btn[i].isActive = true;
      } else {
        btn[i].isActive = false;
      }
    }
    setBtn([...btn]);
  };
  const getData = async () => {
    let Token: any = await AsyncStorage.getItem('token');
    setToken(Token);
    if (Token) {
      const res = await getUserData();
      setdata(res);
    } else {
      nav.replace('SignIn');
    }
  };
  const logOut = () => {
    AsyncStorage.clear();
    nav.replace('SignIn');
  };
  return (
    <>
      {token && (
        <ScrollView style={style.mainContainer}>
          <View style={style.flexEnd}>
            <Buttons
              title={'Logout'}
              onPress={() => {
                logOut();
              }}
              style={style.logOutbtn}
            />
          </View>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {btn?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    isActive(item.id);
                  }}
                  style={[
                    style.tabBtn,
                    item.isActive
                      ? {backgroundColor: Theme.colors.BtnColor}
                      : {backgroundColor: Theme.colors.white},
                  ]}
                  key={index}>
                  <Text
                    style={[
                      style.btnText,
                      item.isActive
                        ? {color: Theme.colors.white}
                        : {color: Theme.colors.BtnColor},
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <Text style={style.mainTextHeading}>Manage My Account</Text>
          <View style={style.Contianer}>
            <View style={style.contentCenter}>
              {data?.profileImageUrl != null ? (
                <Image
                  source={{uri: data?.profileImageUrl}}
                  style={style.profileImg}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/defualtProfile.jpg')}
                  style={style.profileImg}
                />
              )}
            </View>
            <View style={{rowGap: 10}}>
              <TextInputs
                lebel={'First Name'}
                value={data?.firstName}
                readOnly={true}
              />
              <TextInputs
                lebel={'Last Name'}
                value={data?.lastName}
                readOnly={true}
              />
            </View>
            <View style={style.contentCenter}>
              <Buttons
                title={'Update Profile'}
                onPress={() => {}}
                style={style.logOutbtn}
              />
              <View style={style.line} />
              <Buttons
                title={'Change Password'}
                onPress={() => {setIsVisible(true)}}
                style={style.logOutbtn}
              />
            </View>
          </View>
          <PopUp setIsVisible={setIsVisible} isVisible={isVisible} />
          <View style={{marginBottom: 30}} />
        </ScrollView>
      )}
    </>
  );
}
