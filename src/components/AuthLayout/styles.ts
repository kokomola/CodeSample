import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';
import { multiplier } from '@constants/platform';

export const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  backButtonBox: {
    height: 24 * multiplier,
  },
  title: {
    paddingTop: 37 * multiplier,
    textAlign: 'left',
    fontSize: 20,
    color: colors.space900,
    fontWeight: 'bold',
  },
  tip: {
    paddingTop: 16,
    textAlign: 'left',
    fontSize: 15,
    color: colors.independence500,
    lineHeight: 20,
  },
  inputsBox: {
    paddingVertical: 32 * multiplier,
  },
});
