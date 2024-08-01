import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  FlatList,
} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import style from './style';
import Buttons from '../../../component/buttons/Buttons';
import Theme from '../../../theme/Theme';
import TextInputs from '../../../component/textInput/TextInputs';
import {getUserData, get_all_orders} from '../../../api/services/Get';
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
import Orders from './manageOrder/Orders';

function UserProfile() {
  const Route: any = useRoute();
  const ref: any = useRef(null);
  const [index, setIndex] = useState(0);
  const nav: any = useNavigation();
  const [token, setToken] = useState();
  const [isLogout, setIsLogout] = useState(false);
  const [pageChange, setPageChange] = useState(1);
  const [loading, setLoading] = useState(false);
  const [getAllOrder, setGetAllOrder] = useState([]);
  const [returnOrder, setReturnOrder] = useState([]);
  const [cancelOrder, setCancelOrder] = useState([]);

  const [btn, setBtn] = useState([
    {
      id: 1,
      name: 'My Profile',
      isActive: true,
    },
    {
      id: 2,
      name: 'My Orders',
      isActive: false,
    },
    {
      id: 3,
      name: 'My Returns',
      isActive: false,
    },
    {
      id: 4,
      name: 'My Cancellation',
      isActive: false,
    },
    {
      id: 5,
      name: 'My Address ',
      isActive: false,
    },
  ]);
  useEffect(() => {
    ref?.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  }, [index]);
  useFocusEffect(
    React.useCallback(() => {
      setIndex(0);
      getData();
      if (Route?.params?.Btn == '4') {
        // isActive(4);
      } else {
        isActive(1);
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
          const res1 = await get_all_orders();
          setGetAllOrder(res1);
          const Canceled = res1.filter(
            (x: any) => x.orderStatusType == 'Canceled',
          );
          setCancelOrder(Canceled);
          const returned = res1.filter(
            (x: any) => x.orderStatusType == 'Returned',
          );
          setReturnOrder(returned);
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
            <FlatList
              ref={ref}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={btn}
              renderItem={({item, index}: any) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      isActive(item.id);
                      setIndex(index);
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
                );
              }}
            />
            {/* <ScrollView
              ref={ref}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {btn?.map((item, index) => (
                
              ))}
            </ScrollView> */}
          </View>
          {loading ? (
            <View style={style.mainContainer}>
              <Loader />
            </View>
          ) : (
            <>
              <Text style={style.mainTextHeading}>Manage My Account</Text>
              {pageChange == 1 ? (
                <PofileInfo />
              ) : pageChange == 2 ? (
                <Orders allOrder={getAllOrder} />
              ) : pageChange == 3 ? (
                <ReturnsInfo returnOrder={returnOrder} />
              ) : pageChange == 4 ? (
                <CancellationInfo cancelOrder={cancelOrder} />
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
export default UserProfile;
