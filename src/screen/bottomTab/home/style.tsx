import {Dimensions, StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';
const windowWidth = Dimensions.get('window').width;

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
    alignItems: 'center',
  },
  CategoriesText: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    marginVertical: Theme.fontSize.size10,
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
  Shimercontainer: {
    backgroundColor: Theme.colors.white,
    // padding: 5,
    margin: Theme.fontSize.size5,
    overflow: 'hidden',
    width: windowWidth / 2.5,
    elevation: Theme.fontSize.size3,
    borderRadius: Theme.fontSize.size5,
    borderWidth: Theme.fontSize.size1,
    borderColor: Theme.colors.borderColor,
    height: Theme.fontSize.size236,
    
  },
});

export default style;
