import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {get_SubCategory_products} from '../../../api/services/Get';
import style from '../style';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Loader from '../../../component/loader/Loader';

export default function Main_Sub_Categori() {
  const Route: any = useRoute();
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav: any = useNavigation();

  useEffect(() => {
    getCategoriData();
  }, []);
  const getCategoriData = async () => {
    setLoading(true);
    const getSubCategoriData = await get_SubCategory_products(Route.params.ID);
    setGetData(getSubCategoriData);
    setLoading(false);
  };
  return (
    <ScrollView style={style.mainContainer}>
      <Text style={[style.mainTextHeading, {marginTop: 20}]}>
        {Route.params.name} Furniture
      </Text>
      {loading ? (
        <View style={style.mainContainer}>
          <Loader />
        </View>
      ) : (
        <View style={style.subCategoriContainer}>
          {getData.length > 0 ? (
            getData.map((val: any, index: any) => (
              <TouchableOpacity
                onPress={() =>
                  nav.navigate('Product_cart', {Id: val.productId})
                }
                key={index}
                style={style.subCategoriInnerContainer}>
                <Image source={{uri: val.image}} style={style.subCategoriImg} />
                <View style={{padding: 5}}>
                  <Text style={style.subCategoriText} numberOfLines={1}>
                    {val.productName}
                  </Text>
                  {val.discountPrice > 0 && (
                    <View style={style.rowContainer}>
                      <Text style={style.subCategoriDiccountText}>
                        Rs: {val.discountPrice}
                      </Text>
                      <Text style={style.subCategoriDiccountOffText}>
                        {val.discount}% Off
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
                    <Text style={style.subCategoriPrice}>Rs: {val.price}</Text>
                    <TouchableOpacity>
                      <Image
                        source={require('../../../assets/images/add-shopping-cart.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{alignItems: 'center', rowGap: 10}}>
              <Text style={[style.mainTextHeading, {marginTop: 20}]}>
                Product Not Found
              </Text>
              <TouchableOpacity
                onPress={() => {
                  nav.goBack();
                }}>
                <Text style={style.backBtn}>Go Back</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
