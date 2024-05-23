import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import style from './style';
import Buttons from '../../../component/buttons/Buttons';
import Theme from '../../../theme/Theme';
import TextInputs from '../../../component/textInput/TextInputs';
import {getUserData} from '../../../api/services/Get';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUp from '../../../component/popUp/PopUp';
import PofileInfo from './PofileInfo';
import AddressInfo from './AddressInfo';
import ReturnsInfo from './ReturnsInfo';
import CancellationInfo from './CancellationInfo';
import Loader from '../../../component/loader/Loader';
import {isNetworkAvailable} from '../../../api/Api';
import Toast from 'react-native-toast-message';

export default function UserProfile() {
  const Route: any = useRoute();
  const [data, setdata] = useState<any>();
  const nav: any = useNavigation();
  const [token, setToken] = useState();
  const [isLogout, setIsLogout] = useState(false);
  const [pageChange, setPageChange] = useState(1);
  const [loading, setLoading] = useState(false);

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
      if (Route?.params?.Btn) {
        isActive(4);
      }
    }, []),
  );
  const isActive = (itemId: any) => {
    for (let i = 0; i < btn?.length; i++) {
      if (btn[i].id == itemId) {
        btn[i].isActive = true;
        setPageChange(btn[i].id);
      } else {
        btn[i].isActive = false;
      }
    }
    setBtn([...btn]);
  };
  const getData = async () => {
    setLoading(true);
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        let Token: any = await AsyncStorage.getItem('token');
        setToken(Token);
        if (Token) {
          const res = await getUserData();
          setdata(res);
          setLoading(false);
        } else {
          nav.replace('SignIn');
        }
      } catch (error) {}
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
                setIsLogout(true);
                // logOut();
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
          {loading ? (
            <View style={style.mainContainer}>
              <Loader />
            </View>
          ) : (
            <>
              <Text style={style.mainTextHeading}>Manage My Account</Text>
              {pageChange == 1 ? (
                <PofileInfo data={data} />
              ) : pageChange == 2 ? (
                <ReturnsInfo />
              ) : pageChange == 3 ? (
                <CancellationInfo />
              ) : (
                <AddressInfo />
              )}
            </>
          )}
          <PopUp
            isVisible={isLogout}
            setIsVisible={setIsLogout}
            functionCall={logOut}
            type={'warnning'}
            lebel={'To log out of your account?'}
            btnLebel={'Yes'}
          />
          <View style={{marginBottom: 30}} />
        </ScrollView>
      )}
    </>
  );
}
