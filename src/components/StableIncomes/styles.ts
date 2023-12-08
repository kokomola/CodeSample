import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const s = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconBox: {},
  infoBox: {
    flex: 1,
    paddingHorizontal: 16,
  },
  dateBox: {},
  amountText: {
    fontSize: 14,
    fontWeight: '600',
  },
  typeText: {
    fontSize: 12,
    color: colors.independence500,
    marginTop: 1,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.space900,
  },
});
