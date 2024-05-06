import {StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: Theme.colors.white,
    height: '100%',
    padding: Theme.fontSize.size10,
  },
  flexEnd: {
    alignItems: 'flex-end',
    // marginRight: Theme.fontSize.size15,
    marginBottom: Theme.fontSize.size5,
    marginTop: -Theme.fontSize.size10,
  },
  Contianer: {
    borderRadius: Theme.fontSize.size10,
    borderColor: Theme.colors.borderColor,
    borderWidth: 1,
    padding: Theme.fontSize.size10,
    backgroundColor: Theme.colors.white,
    elevation: 2,
  },
  logOutbtn: {
    paddingHorizontal: Theme.fontSize.size20,
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
  },
  tabBtn: {
    height: Theme.fontSize.size40,
    borderRadius: Theme.fontSize.size10,
    justifyContent: 'center',
    alignItems: 'center',
    width: Theme.fontSize.size115,
    borderWidth: 1,
    borderColor: Theme.colors.BtnColor,
    margin: Theme.fontSize.size10,
  },
  btnText: {
    // fontFamily: FONTFAMILY.ubuntu_bold,
    fontWeight: '600',
    fontSize: Theme.fontSize.size14,
    color: Theme.colors.BtnColor,
  },
  mainTextHeading: {
    fontSize: Theme.fontSize.size16,
    fontWeight: '700',
    color: Theme.colors.black,
    textAlign: 'center',
    marginBottom: Theme.fontSize.size5,
  },
  profileImg: {
    width: '43%',
    height: Theme.fontSize.size160,
    borderRadius: Theme.fontSize.size100,
  },
  contentCenter: {
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Theme.colors.lightBlack,
    marginTop: Theme.fontSize.size15,
    marginBottom: -Theme.fontSize.size7,
  },
});

export default style;
