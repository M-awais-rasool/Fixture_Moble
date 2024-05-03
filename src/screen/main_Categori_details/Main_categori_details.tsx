import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Slider from '../../component/slider/Slider';
import Header from '../../component/header/Header';
import style from './style';
import {ScrollView} from 'react-native';

export default function Main_categori_details() {
  const Route: any = useRoute();
  const [getData, setGetData] = useState<any>([]);
  const [name, setName] = useState('');
  useEffect(() => {
    Route.params.data?.map((val: any, index: any) => {
      if (index < 1) {
        setName(val.name);
        setGetData(val.subCategories);
      }
    });
  }, []);

  return (
    <ScrollView style={style.mainContainer}>
      <View style={{marginHorizontal: 15}}>
        <Text style={[style.mainTextHeading, {marginTop: 20}]}>
          {Route.params?.name}
        </Text>
        <Slider
          data={Route.params.data}
          onPress={(data: any) => {
            setGetData('');
            setName(data.name);
            setGetData(data.subCategories);
          }}
        />
        <Text style={[style.mainTextHeading, {marginTop: 5, marginBottom: -5}]}>
          {name}
        </Text>
        <View style={style.container}>
          {getData?.map((val: any, index: any) => (
            <View style={style.innerContainer} key={index}>
              <View style={{padding: 10, backgroundColor: 'white'}}>
                <Image source={{uri: val.image}} style={style.img} />
                <Text style={style.containerText} numberOfLines={1}>
                  {val.name}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
