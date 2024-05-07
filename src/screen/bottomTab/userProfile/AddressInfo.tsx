import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Buttons from '../../../component/buttons/Buttons';
import style from './style';
import TextInputs from '../../../component/textInput/TextInputs';
import Theme from '../../../theme/Theme';

export default function AddressInfo() {
  const [addressFlag, setAddressFlag] = useState(false);
  return (
    <View style={style.Contianer}>
      {addressFlag ? (
        <View>
          <Text style={[style.mainTextHeading]}>Add Your Shipping Address</Text>
          <View style={{rowGap: Theme.fontSize.size10}}>
            <TextInputs lebel={'Name'} />
            <TextInputs lebel={'Phone No'} />
            <TextInputs lebel={'Email'} />
            <TextInputs lebel={'Name'} />
            <TextInputs lebel={'Shipping Address'} />
          </View>
          <Buttons
            title={'Save'}
            onPress={() => {
              setAddressFlag(false);
            }}
          />
        </View>
      ) : (
        <View style={style.flexRow}>
          <Text style={[style.mainTextHeading, {textAlign: 'left'}]}>
            Address Management
          </Text>
          <Buttons
            title={'Add New Address'}
            style={{marginTop: 0}}
            onPress={() => {
              setAddressFlag(true);
            }}
          />
        </View>
      )}
    </View>
  );
}
