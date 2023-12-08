import { StyleSheet } from 'react-native';
import { fonts } from '@constants/fonts';

export const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    ...fonts.medium,
    color: '#14121e',
  },
});
