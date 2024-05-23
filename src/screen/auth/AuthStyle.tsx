import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const style = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    height: '100%',
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: Theme.fontSize.size50,
  },
  InputContainer: {
    marginHorizontal: Theme.fontSize.size40,
  },
  forgotText: {
    textAlign: 'right',
    color: Theme.colors.BtnColor,
    fontSize: Theme.fontSize.size14,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    marginVertical: Theme.fontSize.size20,
    fontSize: Theme.fontSize.size16,
    fontWeight: '600',
    color: Theme.colors.black,
  },
  CreateAccText: {
    fontSize: Theme.fontSize.size14,
    fontWeight: '600',
    color: Theme.colors.black,
    textAlign: 'center',
    marginVertical: Theme.fontSize.size20,
  },
});

export default style;
