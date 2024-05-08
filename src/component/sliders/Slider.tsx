import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Theme from '../../theme/Theme';
const windowWidth = Dimensions.get('window').width;

export default function Slider(props: any) {
  const render_item = ({item}: any) => {
    return (
      <>
        {props.type == '' ? (
          <TouchableOpacity
            style={style.container}
            onPress={() =>
              props.onPress({
                categories: item.categories,
                name: item.name,
                subCategories: item.subCategories,
              })
            }>
            <Image source={{uri: item.image}} style={style.img} />
            <Text style={style.lebel} numberOfLines={1}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={style.temtimonialContainer}>
            <View style={style.innercontainer}>
              <View style={style.Header} />
              <View style={{padding: 10, alignItems: 'center'}}>
                {item.image ? (
                  <Image
                    source={{uri: item.image}}
                    style={style.temtimonialImg}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/defualtProfile.jpg')}
                    style={style.temtimonialImg}
                  />
                )}
                <Text style={style.testimonialName}>{item.name}</Text>
                <Text style={style.descripation} numberOfLines={3}>
                  {item.descripation}
                </Text>
              </View>
            </View>
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
        pagingEnabled={props.pagingEnabled}
      />
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    padding: Theme.fontSize.size10,
    alignItems: 'center',
  },
  img: {
    width: Theme.fontSize.size75,
    height: Theme.fontSize.size75,
    borderRadius: Theme.fontSize.size10,
  },
  lebel: {
    textAlign: 'center',
    marginTop: Theme.fontSize.size5,
    fontSize: Theme.fontSize.size13,
    fontWeight: '600',
    color: Theme.colors.black,
    width: Theme.fontSize.size60,
  },
  temtimonialContainer: {
    width: windowWidth,
    alignItems: 'center',
  },
  innercontainer: {
    borderRadius: Theme.fontSize.size10,
    borderColor: Theme.colors.borderColor,
    borderWidth: 1,
    // padding: Theme.fontSize.size10,
    backgroundColor: Theme.colors.white,
    elevation: 2,
    width: '90%',
  },
  Header: {
    height: Theme.fontSize.size80,
    backgroundColor: Theme.colors.BtnColor,
  },
  temtimonialImg: {
    width: Theme.fontSize.size100,
    height: Theme.fontSize.size100,
    borderRadius: Theme.fontSize.size50,
    marginTop: -Theme.fontSize.size50,
  },
  testimonialName: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    marginVertical: Theme.fontSize.size10,
    color: Theme.colors.black,
  },
  descripation: {
    fontSize: Theme.fontSize.size14,
    fontWeight: '500',
    color: Theme.colors.black,
  },
});
