import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  mainTextHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  innerContainer: {
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
  },
  img: {
    width: 75,
    height: 75,
    borderRadius: 5,
  },
  containerText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
    width: 60,
  },
});

export default style;
