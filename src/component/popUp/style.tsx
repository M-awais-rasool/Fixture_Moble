import {Dimensions, StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const windowWidth = Dimensions.get('window').width;

const style = StyleSheet.create({
  modalContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: windowWidth / 1.2,
    minHeight: windowWidth / 1.2,
  },
  modalInnerContainer: {
    height: Theme.fontSize.size55,
    backgroundColor: Theme.colors.black,
    width: windowWidth / 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordText: {
    fontWeight: '800',
    fontSize: Theme.fontSize.size16,
    color: Theme.colors.white,
  },
  flexRow: {
    flexDirection: 'row',
    gap: Theme.fontSize.size30,
    alignSelf: 'center',
  },
  updateBtn: {
    paddingHorizontal: Theme.fontSize.size20,
    fontSize: Theme.fontSize.size15,
    fontWeight: '700',
  },
  cancelBtn: {
    backgroundColor: Theme.colors.white,
    borderWidth:Theme.fontSize.size1,
    color: Theme.colors.black,
    paddingHorizontal: Theme.fontSize.size20,
    fontSize: Theme.fontSize.size15,
    fontWeight: '700',
    borderColor: Theme.colors.BtnColor,
  },
  loading: {
    width: '100%',
    height:Theme.fontSize.size105,
    alignSelf: 'center',
  },
  sureText: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    color: Theme.colors.black,
    textAlign: 'center',
  },
  removeBtn: {
    backgroundColor: Theme.colors.blueColor,
    borderWidth: Theme.fontSize.size1,
    paddingHorizontal: Theme.fontSize.size20,
    fontSize: Theme.fontSize.size15,
    fontWeight: '700',
    borderColor: Theme.colors.blueColor,
  },
  addressContainer: {
    // flexWrap: 'wrap',
    paddingHorizontal: Theme.fontSize.size10,
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
    marginVertical:5
  },
});

export default style;
