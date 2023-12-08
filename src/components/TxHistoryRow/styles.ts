import { StyleSheet } from 'react-native';

import * as colors from '@constants/colors';
import { fonts } from '@constants/fonts';

export const styles = StyleSheet.create({
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
    //fontWeight: '600',
    ...fonts.bold,
    color: colors.space900,
  },
  circleIconBox: {
    width: 44,
    height: 44,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
