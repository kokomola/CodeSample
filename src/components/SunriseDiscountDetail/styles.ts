import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';
import { fonts } from '@constants/fonts';

export const styles = StyleSheet.create({
  box: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 70,
  },
  title: {
    fontSize: 20,
    color: colors.independence900,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    ...fonts.medium,
    fontSize: 16,
    color: colors.independence900,
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  column35: {
    width: '35%',
  },
  column65: {
    width: '65%',
  },
  right: {
    textAlign: 'right',
  },
});
