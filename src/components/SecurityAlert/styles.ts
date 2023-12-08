import { StyleSheet } from 'react-native';

import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  box: {
    padding: 20,
    borderWidth: 1,
    borderColor: colors.space300,
    borderRadius: 8,
  },
  icon: {
    paddingBottom: 12,
  },
  title: {
    paddingVertical: 12,
    color: colors.space900,
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    paddingBottom: 12,
    color: colors.space900,
    fontSize: 16,
  },
});
