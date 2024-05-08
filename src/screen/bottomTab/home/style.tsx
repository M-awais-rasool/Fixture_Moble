import {StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.fontSize.size20,
    marginHorizontal: Theme.fontSize.size10,
    alignItems:'center'
  },
  CategoriesText: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    color: 'black',
    textAlign:'center',
    marginVertical:10
  },
  viewText: {
    fontSize: Theme.fontSize.size14,
    fontWeight: '500',
    color: Theme.colors.BtnColor,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: Theme.fontSize.size10,
  },
});

export default style;
