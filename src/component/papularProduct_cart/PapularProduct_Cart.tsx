import {View, Text, Image} from 'react-native';
import React from 'react';
import style from './style';
export default function PapularProduct_Cart(props: any) {
  return (
    <View style={{padding:10}}>
      <View style={style.container}>
        <Image source={{uri: props.data.image}} style={style.img} />
        <View>
          <Text numberOfLines={1}>{props.data.productName}</Text>
          <Text>{props.data.quantity}</Text>
          <Text>{props.data.price}</Text>
        </View>
      </View>
    </View>
  );
}
