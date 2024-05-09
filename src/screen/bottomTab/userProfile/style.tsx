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
    borderWidth:Theme.fontSize.size1,
    padding: Theme.fontSize.size10,
    backgroundColor: Theme.colors.white,
    elevation: Theme.fontSize.size2,
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
    borderWidth: Theme.fontSize.size1,
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
    height: Theme.fontSize.size1,
    backgroundColor: Theme.colors.disable,
    marginTop: Theme.fontSize.size15,
    marginBottom: -Theme.fontSize.size7,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emailError: {
    fontSize: Theme.fontSize.size12,
    color: Theme.colors.redColor,
    fontWeight: '500',
    marginTop: -Theme.fontSize.size5,
    marginLeft:Theme.fontSize.size5,
    marginBottom: -Theme.fontSize.size5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.fontSize.size30,
  },
  nameHeading: {
    fontSize: Theme.fontSize.size14,
    fontWeight: '500',
    color: Theme.colors.black,
  },
  statusFalseBtn: {
    backgroundColor: Theme.colors.white,
    borderWidth:Theme.fontSize.size1,
    borderColor: Theme.colors.disable,
    color: Theme.colors.black,
    marginTop:Theme.fontSize.size10
  },
  cameraImg:{
    marginLeft:80,
    marginTop:-30,
    width:20,
    height:20
  },
  dropPickerContainer: {
    width: 200,
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  line1: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
  },
  dropPickerText:{
    fontSize:Theme.fontSize.size12,
    color:'black',
    fontWeight: '500',
  }
});

export default style;
