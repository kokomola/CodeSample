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
  infoBox: {
    width: '60%',
    paddingHorizontal: 16,
  },
  dateBox: {
    flex: 1,
  },

  leftTextTop: {
    fontSize: 16,
    paddingBottom: 3,
    ...fonts.bold,
  },
  leftTextBottom: {
    fontSize: 12,
    color: colors.independence500,
    marginTop: 1,
  },
  rightTextTop: {
    fontSize: 14,
    paddingBottom: 3,
    ...fonts.bold,
    color: colors.space900,
    textAlign: 'right',
  },
  rightTextBottom: {
    fontSize: 12,
    color: colors.independence500,
    marginTop: 1,
    textAlign: 'right',
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 30,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.space300,
  },
});
