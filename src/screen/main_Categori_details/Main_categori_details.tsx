import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Slider from '../../component/slider/Slider';
import style from './style';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Loader from '../../component/loader/Loader';

export default function Main_categori_details() {
  const Route: any = useRoute();
  const [getData, setGetData] = useState<any>([]);
  const [name, setName] = useState('');
  const [loading, setloading] = useState(false);
  const nav: any = useNavigation();

  useEffect(() => {
    setloading(true);
    Route.params.data?.map((val: any, index: any) => {
      if (index < 1) {
        setName(val.name);
        setGetData(val.subCategories);
      }
    });
    setloading(false);
  }, []);
  const changeData = (data: any) => {
    setloading(true);
    setGetData('');
    setName(data.name);
    setGetData(data.subCategories);
    setTimeout(() => {
      setloading(false);
    }, 1000);
  };
  return (
    <ScrollView style={style.mainContainer}>
      <View>
        <Text style={[style.mainTextHeading, {marginTop: 20}]}>
          {Route.params?.name}
        </Text>
        <Slider
          data={Route.params.data}
          onPress={(data: any) => {
            changeData(data);
          }}
        />
        <Text style={[style.mainTextHeading, {marginTop: 5, marginBottom: -5}]}>
          {name}
        </Text>
        {loading ? (
          <View style={{marginTop: 20}}>
            <Loader />
          </View>
        ) : (
          <View style={style.container}>
            {getData?.map((val: any, index: any) => (
              <TouchableOpacity
                style={style.innerContainer}
                key={index}
                onPress={() => {
                  nav.navigate('Main_Sub_Categori', {
                    ID: val.subCategoryId,
                    name: val.name,
                  });
                }}>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}>
                  <Image source={{uri: val.image}} style={style.img} />
                  <Text style={style.containerText} numberOfLines={1}>
                    {val.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
