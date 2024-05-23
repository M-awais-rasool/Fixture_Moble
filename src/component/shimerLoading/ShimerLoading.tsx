import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
interface DropDown {
  style: ViewStyle;
}
export default function ShimerLoading(props: DropDown) {
  const ShimerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  return (
    <View>
      <ShimerPlaceHolder style={props.style}></ShimerPlaceHolder>
    </View>
  );
}
