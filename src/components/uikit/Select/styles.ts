import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: colors.space900,
    borderBottomWidth: 1,
    borderBottomColor: colors.independence500,

    paddingVertical: 9,
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    color: colors.space900,
    borderBottomWidth: 1,
    borderBottomColor: colors.independence500,

    paddingVertical: 9,
    paddingRight: 30,
  },
  iconContainer: {
    top: 7,
  },
});
