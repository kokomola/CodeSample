import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';
import { fonts } from '@constants/fonts';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.fieryRose,
  },
  headerText: {
    color: 'white',
    ...fonts.medium,
    textAlign: 'center',
    padding: 10,
  },
});
