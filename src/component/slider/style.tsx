import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 10,
    width: 200,
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius:10,
    elevation:3
  },
  innerContainer:{
   paddingLeft:10
  },
  img: {
    width: 60,
    height: 60,
    borderRadius:5
  },
  nameHeading:{
    fontSize:14,
    fontWeight:'700',
    color:'black',
    width:115
  },
  innderNameHeading:{
    fontSize:12,
    fontWeight:'500',
    color:'black'
  }
});

export default style;
