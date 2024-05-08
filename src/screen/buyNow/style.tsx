import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: Theme.colors.white,
    height: '100%',
    padding: Theme.fontSize.size10,
  },
  Contianer: {
    borderRadius: Theme.fontSize.size10,
    borderColor: Theme.colors.borderColor,
    borderWidth: 1,
    padding: Theme.fontSize.size10,
    backgroundColor: Theme.colors.white,
    elevation: 2,
    rowGap: Theme.fontSize.size10,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emailError: {
    fontSize: Theme.fontSize.size12,
    color: Theme.colors.redColor,
    fontWeight: '500',
    marginTop: -5,
    marginLeft: 5,
    marginBottom: -5,
  },
  mainTextHeading: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    color: Theme.colors.black,
    textAlign: 'center',
    marginBottom: Theme.fontSize.size5,
  },
  img:{
    width:100,
    height:100
  },
  oderFlexRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },
  oderName:{
    fontSize: Theme.fontSize.size14,
    fontWeight: '600',
    color: Theme.colors.black,
  },
  quantityName:{
    fontSize: Theme.fontSize.size13,
    fontWeight: '500',
    color: Theme.colors.black,
  },
  line:{
    width:'100%',
    height:1,
    backgroundColor:Theme.colors.disable
  }
});

export default style;
