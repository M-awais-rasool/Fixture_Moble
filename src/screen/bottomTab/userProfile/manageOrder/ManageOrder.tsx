import {View, Text, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {get_orders_Details} from '../../../../api/services/Get';
import StepIndicator from 'react-native-step-indicator';
import style from '../style';
import Loader from '../../../../component/loader/Loader';

export default function ManageOrder() {
  const [data, setData] = useState<any>();
  const [currentPosition, setCurrentPosition] = useState<any>();
  const [loading, setLoading] = useState(false);
  const Route: any = useRoute();
  console.log(Route);
  const labels = [
    'Pending',
    'Processing',
    'Ready to Ship',
    'Shipped',
    'Delivered',
  ];
  const lebels1 = ['Pending', 'Canceled'];
  const lebels2 = ['Pending', 'Processing', 'Ready to Ship', 'Returned'];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#F29900',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#F29900',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#F29900',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#F29900',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 12,
    stepIndicatorLabelCurrentColor: '#F29900',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 12,
    currentStepLabelColor: '#F29900',
  };

  useEffect(() => {
    getData();
  }, [Route.params.orderId]);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await get_orders_Details(Route.params.orderId);
      console.log(res)

      setData(res);
      if (res.orderStatusType == 'Pending') {
        setCurrentPosition(0);
      } else if (res.orderStatusType == 'InProcess') {
        setCurrentPosition(1);
      } else if (res.orderStatusId == 8) {
        console.log(res.orderStatusType);
        setCurrentPosition(2);
      } else if (res.orderStatusType == 'Shipped') {
        setCurrentPosition(3);
      } else if (res.orderStatusType == 'Delivered') {
        setCurrentPosition(5);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false)
      console.log('error', e);
    }
  };
  return (
    <ScrollView style={style.ManageOrderContainer}>
      {loading ? (
        <View style={style.mainContainer}>
          <Loader />
        </View>
      ) : (
        <>
          <Text style={[style.detailsText, style.margin]}>Order Details</Text>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={
              data?.orderStatusType == 'Canceled'
                ? 3
                : data?.orderStatusType == 'Returned'
                ? 4
                : currentPosition
            }
            stepCount={
              data?.orderStatusType == 'Canceled'
                ? 2
                : data?.orderStatusType == 'Returned'
                ? 4
                : 5
            }
            labels={
              data?.orderStatusType == 'Canceled'
                ? lebels1
                : data?.orderStatusType == 'Returned'
                ? lebels2
                : labels
            }
          />
          {data?.orderDetails?.map((val: any, index: any) => (
            <View style={style.cardContainer} key={index}>
              <View>
                <Text style={style.valueText}>Order# {data.orderNo}</Text>
                <Image
                  source={{uri: val.productImageUrl}}
                  style={style.productImg}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={style.valueText}>{val.productName}</Text>
                <Text style={style.valueText}>Qty: {val.quantity}</Text>
                <Text style={[style.valueText, {color: '#F29900'}]}>
                  {data?.orderStatusType}
                </Text>
                <Text style={style.valueText}>Rs: {val.totalPrice}</Text>
                <Text style={style.valueText}>{val.createAt.slice(0, 10)}</Text>
              </View>
            </View>
          ))}
        </>
      )}
      <View style={{height: 10}} />
    </ScrollView>
  );
}
