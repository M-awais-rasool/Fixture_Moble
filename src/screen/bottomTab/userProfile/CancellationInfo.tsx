import {View, Text} from 'react-native';
import React from 'react';
import style from './style';
import Buttons from '../../../component/buttons/Buttons';
import {useNavigation} from '@react-navigation/native';

export default function CancellationInfo(props: any) {
  const nav: any = useNavigation();
  return (
    <View style={{paddingHorizontal: 10}}>
      {props?.cancelOrder?.length > 0 ? (
        props?.cancelOrder?.map((val: any, index: any) => (
          <View style={style.orderContainer} key={index}>
            <View style={style.OrderInnercontainer}>
              <View style={style.flexRowGap}>
                <View style={{rowGap: 10}}>
                  <Text style={style.headingText}>OrderId : </Text>
                  <Text style={style.headingText}>Status : </Text>
                </View>
                <View style={{rowGap: 10}}>
                  <Text style={style.valueText}>{val.orderNo}</Text>
                  <Text style={style.valueText}>{val.orderStatusType}</Text>
                </View>
              </View>
              <View style={style.flexRowGap}>
                <View style={{rowGap: 10}}>
                  <Text style={style.headingText}>Placed On : </Text>
                  <Text style={style.headingText}>Total : </Text>
                </View>
                <View style={{rowGap: 10}}>
                  <Text style={style.valueText}>
                    {val.createAt.slice(0, 10)}
                  </Text>
                  <Text style={style.valueText}>Rs: {val.totalPrice}</Text>
                </View>
              </View>
            </View>
            <Buttons
              title={'Manage'}
              style={{width: 100, alignSelf: 'center', marginTop: 0}}
              onPress={() => {
                nav.navigate('ManageOrder', {orderId: val.orderId});
              }}
            />
          </View>
        ))
      ) : (
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            color: 'black',
            textAlign: 'center',
            marginTop:20
          }}>
          No Data{' '}
        </Text>
      )}
    </View>
  );
}
