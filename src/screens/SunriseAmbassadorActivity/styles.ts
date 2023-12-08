import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';
import { fonts } from '@constants/fonts';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },

  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.independence200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentText: {
    fontSize: 14,
    color: colors.space900,
    ...fonts.bold,
    marginRight: 5,
  },
  max: {
    fontSize: 12,
    color: colors.space500,
    ...fonts.regular,
    marginTop: 1,
  },
  income: {
    fontSize: 14,
    color: colors.space900,
    ...fonts.bold,
  },
  help: {
    padding: 16,
  },
  helpTitle: {
    fontSize: 20,
    color: colors.space900,
    ...fonts.bold,
  },
  helpSubTitle: {
    fontSize: 14,
    color: colors.space900,
    ...fonts.bold,
    marginTop: 24,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: colors.space900,
  },
});
