import {View, Image, TouchableOpacity, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputs from '../../../component/textInput/TextInputs';
import style from './style';
import Buttons from '../../../component/buttons/Buttons';
import PopUp from '../../../component/popUp/PopUp';
import {askPermision} from '../../../api/Api';
import ImagePicker from 'react-native-image-crop-picker';
import {user_Profile_Update} from '../../../api/services/Put';
import {Overlay} from 'react-native-elements';
import Toast from 'react-native-toast-message';

export default function PofileInfo(props: any) {
  const [isVisible, setIsVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const [img, setImg] = useState();
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [sendImg, setSendImg] = useState('');

  const imgSelected = async (id: any) => {
    if (id == 1) {
      const cameraPermission: any = await askPermision('camera');
      console.warn(cameraPermission);
      if (cameraPermission.result === true) {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          mediaType: 'photo',
        }).then((image: any) => {
          const filename = image.path?.replace(/^.*[\\\/]/, '');
          const formData: any = new FormData();
          formData.append('ProfileImage', {
            uri: image.path,
            type: image.mime,
            name: filename,
          });
          setSendImg(formData);
          setImg(image?.path);
        });
      }
    } else if (id == 2) {
      const cameraPermission: any = await askPermision('gallery');
      if (cameraPermission.result === true) {
        ImagePicker.openPicker({
          width: 500,
          height: 500,
          cropping: true,
          mediaType: 'photo',
        }).then((image: any) => {
          const filename = image.path?.replace(/^.*[\\\/]/, '');
          const formData: any = new FormData();
          formData.append('ProfileImage', {
            uri: image.path,
            type: image.mime,
            name: filename,
          });
          setSendImg(formData);
          setImg(image?.path);
        });
      }
    }
  };

  useEffect(() => {
    setFName(props.data?.firstName);
    setLName(props.data?.lastName);
    setImg(props.data?.profileImageUrl);
  }, []);

  const sendUpdateData = async () => {
    let data = {
      FirstName: fName,
      LastName: lName,
      ProfileImage: sendImg,
    };

    const res = await user_Profile_Update(data);
    console.log(res);

    if (res.status == 200) {
      Toast.show({
        type: 'success',
        text1: 'Profile Update Successfully',
        visibilityTime: 3000,
      });
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
