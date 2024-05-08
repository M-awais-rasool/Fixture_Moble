import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {memo, useEffect, useState} from 'react';
import Theme from '../../theme/Theme';
import {ScrollView} from 'react-native-gesture-handler';

export default function DropDown(props: any) {
  const [isClicked, setisClicked] = useState(false);

  return (
    <View>
      <Text style={style.label}>{props.Textlebel}</Text>
      <View style={style.container}>
        <TouchableOpacity
        disabled={props.disable}
          style={[style.dropDownSelected,props.style]}
          onPress={() => {
            setisClicked(!isClicked);
            props.checkCity();
          }}>
          <Text style={style.genderlabel}>{props.lebel}</Text>
          {isClicked ? (
            <Image source={require('../../assets/images/arrowUp.png')} />
          ) : (
            <Image source={require('../../assets/images/arrowDown.png')} />
          )}
        </TouchableOpacity>
      </View>
      {isClicked && (
        <ScrollView style={style.dropArea}>
          {props.Data?.map((val: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={style.data}
              onPress={() => {
                setisClicked(false);
                if (props.setLebel2) {
                  props.setLebel2('Select Your City');
                }
                props.setLebel(val);
              }}>
              <Text style={style.genderlabel}>{val}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dropDownSelected: {
    borderRadius: Theme.fontSize.size10,
    borderWidth: 1,
    borderColor: Theme.colors.disable,
    height: Theme.fontSize.size40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: Theme.fontSize.size10,
    paddingRight: Theme.fontSize.size6,
    backgroundColor: Theme.colors.white,
  },
  dropArea: {
    top: Theme.fontSize.size61,
    borderBottomRightRadius: Theme.fontSize.size7,
    borderBottomLeftRadius: Theme.fontSize.size7,
    marginLeft: Theme.fontSize.size10,
    width: '95%',
    minHeight: Theme.fontSize.size30,
    elevation: Theme.fontSize.size10,
    backgroundColor: Theme.colors.white,
    position: 'absolute',
    zIndex:Theme.fontSize.size1,
    borderWidth: Theme.fontSize.size1,
    borderColor: Theme.colors.disable,
    maxHeight: Theme.fontSize.size100,
  },
  data: {
    width: Theme.fontSize.size250,
    padding: 1,
  },
  label: {
    // marginTop: Theme.fontSize.size10,
    marginBottom: Theme.fontSize.size2,
    paddingLeft: Theme.fontSize.size5,
    fontSize: Theme.fontSize.size14,
    fontWeight: '500',
    color: Theme.colors.black,
  },
  genderlabel: {
    color: 'black',
    fontSize: Theme.fontSize.size13,
    fontWeight: '500',
    paddingLeft: Theme.fontSize.size5,
    opacity:0.7
  },
});
