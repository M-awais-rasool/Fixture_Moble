import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingHorizontal: 20,
  },
  mainTextHeading: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    color: 'black',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  innerContainer: {
    margin: 10,
    elevation: 3,
  },
  img: {
    width: 75,
    height: 75,
    borderRadius: 5,
  },
  containerText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: Theme.fontSize.size13,
    fontWeight: '600',
    color: 'black',
    width: 60,
  },
  subCategoriContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
  },
  subCategoriInnerContainer: {
    backgroundColor: '#FAFAFA',
    // padding: 5,
    margin: 5,
    overflow: 'hidden',
    width: 150,
    elevation: 3,
    borderRadius: 5,
  },
  subCategoriImg: {
    width: 150,
    height: 100,
  },
  subCategoriText: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.black,
    fontWeight: '600',
  },
  subCategoriPrice: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.lightBlack,
    fontWeight: '500',
  },
  subCategoriDiccountText: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.lightBlack,
    fontWeight: '500',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    // textDecorationColor:'gray'
  },
  subCategoriDiccountOffText: {
    fontSize: Theme.fontSize.size12,
    color: Theme.colors.lightRed,
    fontWeight: '400',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: Theme.fontSize.size3,
  },
  backBtn:{
    width:140,
    height:30,
    backgroundColor:Theme.colors.BtnColor,
    color:'white',
    textAlign:'center',
    textAlignVertical:'center',
    borderRadius:10,
    fontSize:Theme.fontSize.size14,
    fontWeight:'600',

  }
});

export default style;
