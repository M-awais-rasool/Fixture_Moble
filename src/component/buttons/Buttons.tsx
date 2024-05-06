import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

export default function Buttons(props: any) {
  return (
    <View>
      <TouchableOpacity onPress={()=>props.onPress()}>
        <Text style={[style.btn,props.style]}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}


const style= StyleSheet.create({
    btn:{
         backgroundColor:'#F29900',
         padding:10,
         textAlign:'center',
         textAlignVertical:'center',
         marginTop:20,
         color:'white',
         fontSize:13,
         fontWeight:'500',
         borderRadius:5,
    }
})
