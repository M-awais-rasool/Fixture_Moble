import {View, Image, TouchableOpacity, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputs from '../../../component/textInput/TextInputs';
import style from './style';
import Buttons from '../../../component/buttons/Buttons';
import PopUp from '../../../component/popUp/PopUp';
import {checkPermission, isNetworkAvailable} from '../../../api/Api';
import ImagePicker from 'react-native-image-crop-picker';
import {user_Profile_Update} from '../../../api/services/Put';
import {Overlay} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import {getUserData} from '../../../api/services/Get';

export default function PofileInfo(props: any) {
  const [isVisible, setIsVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const [img, setImg] = useState();
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

  const imgSelected = async (id: any) => {
    try {
      let permissionType = id === 1 ? 'camera' : 'gallery';
      const cameraPermission: any = await checkPermission(permissionType);

      if (cameraPermission.result === true) {
        let image: any;
        if (id == 1) {
          image = await ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: 'photo',
          });
        } else if (id == 2) {
          image = await ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            mediaType: 'photo',
          });
        }

        if (image) {
          const filename: any = image.path?.replace(/^.*[\\\/]/, '');
          const formData: any = new FormData();
          formData.append('ProfileImage', {
            uri: image.path,
            type: image.mime,
            name: filename,
          });
          const res = await user_Profile_Update(formData);
          setFName(res?.data?.firstName);
          setLName(res?.data?.lastName);
          setImg(res?.data?.profileImageUrl);
        }
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res = await getUserData();
        setFName(res?.firstName);
        setLName(res?.lastName);
        setImg(res?.profileImageUrl);
      } catch (e) {}
    }
  };

  const sendUpdateData = async () => {
    try {
      const formData = new FormData();
      formData.append('FirstName', fName);
      formData.append('LastName', lName);
      const res = await user_Profile_Update(formData);
      if (res.status === 'Success') {
        setFName(res?.data?.firstName);
        setLName(res?.data?.lastName);
        setImg(res?.data?.profileImageUrl);
        Toast.show({
          type: 'success',
          text1: 'Profile Update Successfully',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  return (
    <View>
      <View style={style.Contianer}>
        <View style={style.contentCenter}>
          {img != null ? (
            <Image source={{uri: img}} style={style.profileImg} />
          ) : (
            <Image
              source={require('../../../assets/images/defualtProfile.jpg')}
              style={style.profileImg}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              setImgVisible(true);
            }}>
            <Image
              source={require('../../../assets/images/profileUplod.png')}
              style={style.cameraImg}
            />
          </TouchableOpacity>
        </View>
        <View style={{rowGap: 10}}>
          <TextInputs onChange={setFName} lebel={'First Name'} value={fName} />
          <TextInputs onChange={setLName} lebel={'Last Name'} value={lName} />
        </View>
        <View style={style.contentCenter}>
          <Buttons
            title={'Update Profile'}
            onPress={() => {
              sendUpdateData();
            }}
            style={style.logOutbtn}
          />
          <View style={style.line} />
          <Buttons
            title={'Change Password'}
            onPress={() => {
              setIsVisible(true);
            }}
            style={style.logOutbtn}
          />
          <PopUp setIsVisible={setIsVisible} isVisible={isVisible} />
          <Overlay
            isVisible={imgVisible}
            overlayStyle={style.dropPickerContainer}>
            <View style={{alignItems: 'center', gap: 10}}>
              <TouchableOpacity
                onPress={() => {
                  imgSelected(1);
                  setImgVisible(false);
                }}>
                <Text style={style.dropPickerText}>Take Photo</Text>
              </TouchableOpacity>
              <View style={style.line1} />
              <TouchableOpacity
                onPress={() => {
                  imgSelected(2);
                  setImgVisible(false);
                }}>
                <Text style={style.dropPickerText}>Choose Photo</Text>
              </TouchableOpacity>
              <View style={style.line1} />
              <TouchableOpacity
                onPress={() => {
                  setImgVisible(false);
                }}>
                <Text style={style.dropPickerText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
        </View>
      </View>
    </View>
  );
}
