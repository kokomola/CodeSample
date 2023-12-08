import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  sv: {
    flex: 1,
  },
  pickerBox: {
    paddingVertical: 10,
  },
  pickerErrorBox: {
    paddingHorizontal: 16,
  },
  inputBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  course: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 14,
    color: colors.space500,
    fontWeight: '500',
  },
  buttonBox: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});
