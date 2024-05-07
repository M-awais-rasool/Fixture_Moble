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
    marginTop: 20,
    marginHorizontal: 10,
  },
  CategoriesText: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    color: 'black',
    textAlign:'center',
    marginVertical:10
  },
  viewText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default style;
