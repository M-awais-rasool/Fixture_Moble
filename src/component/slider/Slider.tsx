import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import PapularProduct_Cart from '../papularProduct_cart/PapularProduct_Cart';

export default function Slider(props: any) {
  const render_item = ({item}: any) => {
    return (
      <>
        {props.type == 'PapularProduct' ? (
          <PapularProduct_Cart data={item}/>
        ) : (
          <View style={style.container}>
            <Image source={{uri: item.image}} style={style.img} />
            <Text style={style.lebel}>{item.name}</Text>
          </View>
        )}
      </>
    );
  };
  return (
    <View>
      <FlatList
        data={props.data}
        renderItem={render_item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    padding: 10,
  },
  img: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  lebel: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
  },
});
