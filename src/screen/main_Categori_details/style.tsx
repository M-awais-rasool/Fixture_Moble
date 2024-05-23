import {Dimensions, StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';
const windowWidth = Dimensions.get('window').width;

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: Theme.colors.white,
    height: '100%',
    paddingHorizontal: Theme.fontSize.size20,
  },
  mainTextHeading: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    color: 'black',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Theme.fontSize.size10,
    justifyContent: 'center',
  },
  innerContainer: {
    margin: Theme.fontSize.size10,
    elevation: Theme.fontSize.size3,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.fontSize.size5,
    // alignItems:'center',
    // justifyContent:'center'
  },
  img: {
    width: Theme.fontSize.size75,
    height: Theme.fontSize.size75,
    borderRadius: Theme.fontSize.size5,
  },
  containerText: {
    textAlign: 'center',
    marginTop: Theme.fontSize.size5,
    fontSize: Theme.fontSize.size13,
    fontWeight: '600',
    color: 'black',
    width: Theme.fontSize.size60,
  },
  subCategoriContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Theme.fontSize.size10,
    justifyContent: 'center',
  },
  subCategoriInnerContainer: {
    backgroundColor: '#FAFAFA',
    // padding: 5,
    margin: Theme.fontSize.size5,
    overflow: 'hidden',
    width: windowWidth / 2.5,
    elevation: Theme.fontSize.size3,
    borderRadius: Theme.fontSize.size5,
    borderWidth: Theme.fontSize.size1,
    borderColor: Theme.colors.borderColor,
  },
  subCategoriImg: {
    width: '100%',
    height: Theme.fontSize.size100,
  },
  subCategoriText: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.black,
    fontWeight: '600',
  },
  subCategoriPrice: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.disable,
    fontWeight: '500',
  },
  subCategoriDiccountText: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.disable,
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
    gap: Theme.fontSize.size5,
    marginTop: Theme.fontSize.size3,
  },
  backBtn: {
    width: Theme.fontSize.size140,
    height: Theme.fontSize.size30,
    backgroundColor: Theme.colors.BtnColor,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: Theme.fontSize.size10,
    fontSize: Theme.fontSize.size14,
    fontWeight: '600',
  },
});

export default style;
