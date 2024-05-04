import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  BackgroundImg: {
    width: '100%',
    height: 85,
    elevation: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 25,
  },
  addTocartContainer: {
    position: 'absolute',
    top: -10,
    right: -15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    backgroundColor: '#F29900',
    borderRadius: 20,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',

    // textAlign: 'center',
    // textAlignVertical: 'center',
  },
});

export default style;
