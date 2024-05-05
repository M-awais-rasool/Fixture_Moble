import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingHorizontal: Theme.fontSize.size20,
    width: '100%',
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
    borderWidth: 1,
    padding: Theme.fontSize.size10,
    backgroundColor: Theme.colors.white,
    elevation: 2,
    marginVertical: Theme.fontSize.size10,
    flexDirection: 'row',
    gap: 10,
  },
  img: {
    width: Theme.fontSize.size110,
    height: Theme.fontSize.size110,
    borderRadius: 5,
  },
  productNameText: {
    fontSize: Theme.fontSize.size14,
    fontWeight: '600',
    color: Theme.colors.black,
  },
  wishlistContainer: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: 15,
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
    color: Theme.colors.lightBlack,
    fontWeight: '500',
  },
  DiccountText: {
    fontSize: Theme.fontSize.size13,
    color: Theme.colors.lightBlack,
    fontWeight: '500',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    // textDecorationColor:'gray'
  },
  DiccountOffText: {
    fontSize: Theme.fontSize.size12,
    color: Theme.colors.lightRed,
    fontWeight: '400',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: Theme.fontSize.size3,
    alignItems: 'center',
  },
});

export default style;
