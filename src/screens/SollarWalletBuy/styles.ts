import { fonts } from '@constants/fonts';
import { isIOS } from '@constants/platform';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  box: {
    marginTop: 15,
    paddingHorizontal: 16,
  },
  offset: {
    marginVertical: 8,
  },
  inputBox: {
    paddingVertical: 8,
  },
  buttonBox: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  customStyle: {
    paddingRight: 70,
    paddingLeft: 87,
  },
  placeholder: {
    position: 'absolute',
    fontSize: 17,
    top: 0,
    bottom: 0,
    textAlignVertical: 'center',
    lineHeight: isIOS ? 40 : 20,
    paddingRight: 10,
  },
  border: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  primaryText: {
    fontSize: 14,
    ...fonts.medium,
    color: 'black',
  },
  smallText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 2,
  },
  fullAmountButton: {
    marginTop: 10,
    marginBottom: 30,
  },
  text: {
    color: 'black',
  },
});
