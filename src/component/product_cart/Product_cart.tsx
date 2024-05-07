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
        <View style={{padding: 5}}>
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
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/add-shopping-cart.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  subCategoriInnerContainer: {
    backgroundColor: '#FAFAFA',
    // padding: 5,
    margin: 5,
    overflow: 'hidden',
    width: windowWidth / 2.5,
    elevation: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Theme.colors.borderColor,
    height:236
  },
  subCategoriImg: {
    width: '100%',
    // height: 100,
    aspectRatio: 5 / 5,
    objectFit:'cover'
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
    gap: 5,
    marginTop: Theme.fontSize.size3,
  },
});
