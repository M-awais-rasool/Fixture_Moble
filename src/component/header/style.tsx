import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const style = StyleSheet.create({
  BackgroundImg: {
    width: '100%',
    height: Theme.fontSize.size85,
    elevation: Theme.fontSize.size10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.fontSize.size15,
    marginHorizontal: Theme.fontSize.size25,
  },
  addTocartContainer: {
    position: 'absolute',
    top: -Theme.fontSize.size10,
    right: -Theme.fontSize.size15,
    alignItems: 'center',
    justifyContent: 'center',
    width: Theme.fontSize.size20,
    height: Theme.fontSize.size20,
    backgroundColor: Theme.colors.BtnColor,
    borderRadius: Theme.fontSize.size20,
  },
  addToCartText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.size12,
    fontWeight: '800',

    // textAlign: 'center',
    // textAlignVertical: 'center',
  },
});

export default style;
