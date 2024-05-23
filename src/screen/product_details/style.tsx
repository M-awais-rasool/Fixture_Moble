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
    borderWidth: Theme.fontSize.size1,
    padding: Theme.fontSize.size10,
    backgroundColor: Theme.colors.white,
    elevation: Theme.fontSize.size2,
  },
  mainImg: {
    width: '100%',
    // height: 200,
    objectFit: 'fill',
    aspectRatio: Theme.fontSize.size5 / 4,
    borderTopRightRadius: Theme.fontSize.size5,
    borderTopLeftRadius: Theme.fontSize.size5,
  },
  mainTextHeading: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    color: Theme.colors.black,
    marginTop: Theme.fontSize.size10,
  },
  highlightText: {
    fontSize: Theme.fontSize.size14,
    fontWeight: '500',
    color: Theme.colors.black,
  },
  line: {
    width: '100%',
    height: Theme.fontSize.size1,
    backgroundColor: Theme.colors.disable,
    marginVertical: Theme.fontSize.size5,
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
  quantityBox: {
    width: Theme.fontSize.size35,
    height: Theme.fontSize.size20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Theme.fontSize.size1,
    borderRadius: Theme.fontSize.size50,
    borderColor: Theme.colors.disable,
  },
  buyBtn: {
    padding: Theme.fontSize.size10,
    backgroundColor: Theme.colors.BtnColor,
    borderRadius: Theme.fontSize.size50,
    color: Theme.colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: Theme.fontSize.size20,
    fontSize: Theme.fontSize.size14,
    fontWeight: '600',
  },
  deliveryText: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    color: Theme.colors.black,
    textAlign: 'center',
  },
  deliveryContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  deliveryInnerContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.fontSize.size3,
    flexWrap: 'wrap',
  },
  deliveryInnerContainer2: {
    width: '50%',
    paddingHorizontal: Theme.fontSize.size10,
    paddingTop: Theme.fontSize.size10,
    rowGap: Theme.fontSize.size10,
  },
  line1: {
    marginTop: Theme.fontSize.size5,
    height: Theme.fontSize.size90,
    width: Theme.fontSize.size1,
    backgroundColor: Theme.colors.disable,
  },
});

export default style;
