import { StyleSheet } from 'react-native';

import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.purple500,
    borderRadius: 8,
  },
  touchableBox: {
    paddingVertical: 12,
    paddingHorizontal: 9,
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 1,
    flexBasis: 0,
  },
  label: {
    color: colors.white,
    fontSize: 14,
    marginVertical: 4,
    textAlign: 'center',
    maxWidth: '90%',
  },
  labelDisabled: {
    color: colors.independence400,
  },
});
