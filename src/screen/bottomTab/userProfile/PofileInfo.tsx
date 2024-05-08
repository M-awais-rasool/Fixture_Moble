import {View, Image} from 'react-native';
import React, {useState} from 'react';
import TextInputs from '../../../component/textInput/TextInputs';
import style from './style';
import Buttons from '../../../component/buttons/Buttons';
import PopUp from '../../../component/popUp/PopUp';

export default function PofileInfo(props: any) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <View style={style.Contianer}>
        <View style={style.contentCenter}>
          {props.data?.profileImageUrl != null ? (
            <Image
              source={{uri: props.data?.profileImageUrl}}
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
            value={props.data?.firstName}
            readOnly={true}
          />
          <TextInputs
            lebel={'Last Name'}
            value={props.data?.lastName}
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
            onPress={() => {
              setIsVisible(true);
            }}
            style={style.logOutbtn}
          />
          <PopUp setIsVisible={setIsVisible} isVisible={isVisible} />
        </View>
      </View>
    </View>
  );
}
