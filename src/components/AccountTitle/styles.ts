import { StyleSheet } from 'react-native';

import * as colors from '@constants/colors';
import { fonts } from '@constants/fonts';

export const styles = StyleSheet.create({
  balance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 24,
    color: colors.space900,
    //fontWeight: '800', change by Daria
    ...fonts.bold,
    paddingLeft: 14,
    flex: 1,
    flexWrap: 'wrap',
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 30,
  },
});
