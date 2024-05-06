import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import style from './style';
import {Overlay} from 'react-native-elements';
import TextInputs from '../textInput/TextInputs';
import Buttons from '../buttons/Buttons';
import Theme from '../../theme/Theme';
import LottieView from 'lottie-react-native';
const windowWidth = Dimensions.get('window').width;

export default function PopUp(props: any) {
  return (
    <Overlay isVisible={props.isVisible}>
      <View
        style={[
          style.modalContainer,
          props.type == 'warnning' && {
            width: windowWidth / 1.5,
            minHeight: windowWidth / 1.6,
          },
        ]}>
        {props.type == 'warnning' ? (
          <View>
            <LottieView
              source={require('../../assets/warnning.json')}
              autoPlay
              style={style.loading}
              loop={false}
            />
            <Text style={style.sureText}>Are you sure?</Text>
            <Text
              style={[
                style.sureText,
                {fontSize: 14, fontWeight: '500', marginTop: 10},
              ]}>
              You won't be remove to wishlist!
            </Text>
            <View style={style.flexRow}>
              <Buttons
                title={'Yes, remove it!'}
                onPress={() => {
                  props.functionCall();
                  props.setIsVisible(false);
                }}
                style={style.removeBtn}
              />
              <Buttons
                title={'Cancel'}
                onPress={() => {
                  props.setIsVisible(false);
                }}
                style={[
                  style.removeBtn,
                  {
                    backgroundColor: Theme.colors.redColor,
                    borderColor: Theme.colors.redColor,
                  },
                ]}
              />
            </View>
          </View>
        ) : (
          <>
            <View style={style.modalInnerContainer}>
              <Text style={style.passwordText}>Password Update</Text>
            </View>
            <View style={{rowGap: 12, marginTop: 15}}>
              <TextInputs
                lebel={'Old Password'}
                placeholder={'Enter previous password'}
              />
              <TextInputs
                lebel={'New Password'}
                placeholder={'Enter new password'}
              />
              <TextInputs
                lebel={'Confirm New Password'}
                placeholder={'Enter Confirm password'}
              />
            </View>
            <View style={style.flexRow}>
              <Buttons
                title={'Update'}
                onPress={() => {}}
                style={style.updateBtn}
              />
              <Buttons
                title={'Cancel'}
                onPress={() => {
                  props.setIsVisible(false);
                }}
                style={style.cancelBtn}
              />
            </View>
          </>
        )}
      </View>
    </Overlay>
  );
}
