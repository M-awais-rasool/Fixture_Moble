import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import Theme from '../../theme/Theme';
const windowWidth = Dimensions.get('window').width;

export default function Product_cart(props: any) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.onPress();
        }}
        style={style.subCategoriInnerContainer}>
        <Image source={{uri: props.data.image}} style={style.subCategoriImg} />
        <View
          style={{
            padding: Theme.fontSize.size5,
            paddingHorizontal: Theme.fontSize.size10,
          }}>
          <Text style={style.subCategoriText} numberOfLines={1}>
            {props.data.productName}
          </Text>
          {props.data.discountPrice > 0 && (
            <View style={style.rowContainer}>
              <Text style={style.subCategoriDiccountText}>
                Rs: {props.data.discountPrice}
              </Text>
              <Text style={style.subCategoriDiccountOffText}>
                {props.data.discount}% Off
              </Text>
            </View>
          )}
          <View
            style={[
              style.rowContainer,
              {
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text style={style.subCategoriPrice}>Rs: {props.data.price}</Text>
            {props.data.quantity > 0 && (
              <TouchableOpacity
                onPress={() => {
                  props.onCartPress();
                }}>
                <Image
                  source={require('../../assets/images/add-shopping-cart.png')}
                />
              </TouchableOpacity>
            )}
          </View>
          {props.data.quantity < 1 && (
            <Text
              style={[style.subCategoriDiccountOffText, {textAlign: 'center'}]}>
              Out of Stock
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  subCategoriInnerContainer: {
    backgroundColor:Theme.colors.white,
    // padding: 5,
    margin: Theme.fontSize.size5,
    overflow: 'hidden',
    width: windowWidth / 2.5,
    elevation: Theme.fontSize.size3,
    borderRadius: Theme.fontSize.size5,
    borderWidth: Theme.fontSize.size1,
    borderColor: Theme.colors.borderColor,
    height: Theme.fontSize.size236,
  },
  subCategoriImg: {
    width: '100%',
    // height: 100,
    aspectRatio: Theme.fontSize.size5 / Theme.fontSize.size5,
    objectFit: 'cover',
  },
  subCategoriText: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.black,
    fontWeight: '600',
  },
  subCategoriPrice: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.disable,
    fontWeight: '500',
  },
  subCategoriDiccountText: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.disable,
    fontWeight: '500',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    // textDecorationColor:'gray'
  },
  subCategoriDiccountOffText: {
    fontSize: Theme.fontSize.size12,
    color: Theme.colors.lightRed,
    fontWeight: '400',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: Theme.fontSize.size5,
    marginTop: Theme.fontSize.size3,
  },
});
