import { StyleSheet } from 'react-native';

import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.independence300,
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    paddingLeft: 16,
  },
  label: {
    fontSize: 14,
    color: colors.space900,
  },
  amount: {
    fontSize: 20,
    color: colors.space900,
    fontWeight: 'bold',
  },
  paginationContainer: {
    paddingVertical: 12,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.purple500,
  },
  image: { width: 44, height: 44, borderRadius: 30 }
});
