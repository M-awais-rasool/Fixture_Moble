import {View, Text, Image} from 'react-native';
import React from 'react';
import style from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function PapularProduct_Cart(props: any) {
  return (
    <View style={{padding: 10}}>
      <TouchableOpacity style={style.container}>
        <Image source={{uri: props.data.image}} style={style.img} />
        <View style={style.innerContainer}>
          <Text numberOfLines={1} style={style.nameHeading}>
            {props.data.productName}
          </Text>
          <Text numberOfLines={1} style={style.innderNameHeading}>
            Quantity: {props.data.quantity}
          </Text>
          <Text numberOfLines={1} style={style.innderNameHeading}>
            RS: {props.data.price}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
