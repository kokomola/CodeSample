import { purple500 } from '@constants/colors';
import { fonts } from '@constants/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  date: {
    ...fonts.bold,
    fontSize: 14,
    color: purple500,
    textAlign: 'right',
  },
});
