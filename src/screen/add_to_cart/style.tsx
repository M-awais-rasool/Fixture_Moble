import {Dimensions, StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';
const windowWidth = Dimensions.get('window').width;
const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingHorizontal: Theme.fontSize.size10,
    width: '100%',
    // flex:1
  },
  MinText: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    color: Theme.colors.black,
    marginTop: Theme.fontSize.size20,
  },
  cartContainer: {
    borderRadius: Theme.fontSize.size10,
    borderColor: Theme.colors.borderColor,
    borderWidth:Theme.fontSize.size1,
    padding: Theme.fontSize.size10,
    backgroundColor: Theme.colors.white,
    elevation:Theme.fontSize.size2,
    marginVertical: Theme.fontSize.size10,
    flexDirection: 'row',
    gap: Theme.fontSize.size10,
    overflow:'hidden',
    flex:1
  },
  img: {
    width: Theme.fontSize.size110,
    height: Theme.fontSize.size110,
    borderRadius: Theme.fontSize.size5,
  },
  productNameText: {
    fontSize: Theme.fontSize.size14,
    fontWeight: '600',
    color: Theme.colors.black,
    marginTop: -Theme.fontSize.size5,
    width:'66%'
  },
  wishlistContainer: {
    alignItems: 'flex-end',
    marginTop: -Theme.fontSize.size15,
  },
  emptyText: {
    fontSize: Theme.fontSize.size14,
    fontWeight: '700',
    color: Theme.colors.black,
    marginTop: Theme.fontSize.size15,
  },
  addText: {
    fontSize: Theme.fontSize.size12,
    fontWeight: '500',
    color: Theme.colors.black,
  },
  Price: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.disable,
    fontWeight: '500',
  },
  DiccountText: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.disable,
    fontWeight: '500',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  DiccountOffText: {
    fontSize: Theme.fontSize.size12,
    color: Theme.colors.lightRed,
    fontWeight: '400',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: Theme.fontSize.size5,
    marginTop: Theme.fontSize.size3,
    alignItems: 'center',
  },
  btn: {
    fontSize: Theme.fontSize.size14,
    color: Theme.colors.black,
    borderColor: Theme.colors.BtnColor,
    backgroundColor: Theme.colors.white,
    borderWidth: Theme.fontSize.size1,
    borderRadius: Theme.fontSize.size10,
    fontWeight: '600',
    padding: Theme.fontSize.size10,
    paddingHorizontal: Theme.fontSize.size20,
  },
  highlightText: {
    fontSize: Theme.fontSize.size14,
    fontWeight: '500',
    color: Theme.colors.black,
  },
  quantityBox: {
    width: Theme.fontSize.size35,
    height: Theme.fontSize.size20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: Theme.fontSize.size50,
    borderColor: Theme.colors.disable,
  },
  quantityContainer: {
    flexDirection: 'row',
    gap: Theme.fontSize.size5,
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.fontSize.size20,
  },
  line:{
    width:'100%',
    height:1,
    backgroundColor:Theme.colors.disable,
  }
});

export default style;
