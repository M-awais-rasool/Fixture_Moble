import {StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';

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
    elevation:Theme.fontSize.size2,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: Theme.fontSize.size10,
  },
});

export default style;
