import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Slider from '../../component/sliders/Slider';
import style from './style';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Loader from '../../component/loader/Loader';
import Theme from '../../theme/Theme';
import * as Animatable from 'react-native-animatable';

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
        <Animatable.View animation={'fadeInDown'} duration={1500}>
          <Text
            style={[style.mainTextHeading, {marginTop: Theme.fontSize.size20}]}>
            {Route.params?.name}
          </Text>
          <Slider
            type={''}
            data={Route.params.data}
            onPress={(data: any) => {
              changeData(data);
            }}
          />
        </Animatable.View>
        <Animatable.Text
          animation={'slideInUp'}
          duration={2000}
          style={[
            style.mainTextHeading,
            {
              marginTop: Theme.fontSize.size5,
              marginBottom: -Theme.fontSize.size5,
            },
          ]}>
          {name}
        </Animatable.Text>
        {loading ? (
          <View style={style.mainContainer}>
            <Loader />
          </View>
        ) : (
          <Animatable.View
            animation={'slideInUp'}
            duration={1500}
            style={style.container}>
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
                <Animatable.View
                  style={{
                    padding: Theme.fontSize.size10,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: Theme.fontSize.size5,
                  }}>
                  <Animatable.Image
                    animation={'zoomIn'}
                    duration={1200}
                    source={{uri: val.image}}
                    style={style.img}
                  />
                  <Text style={style.containerText} numberOfLines={1}>
                    {val.name}
                  </Text>
                </Animatable.View>
              </TouchableOpacity>
            ))}
          </Animatable.View>
        )}
      </View>
    </ScrollView>
  );
}
