import { StyleSheet } from 'react-native';

import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  step: {},

  box: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  text: {
    fontSize: 16,
    color: colors.space900,
    paddingBottom: 32,
  },

  secret: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 32,
  },
  secretLabel: {
    fontSize: 16,
    color: colors.space900,
    paddingBottom: 4,
  },
  secretKey: {
    fontSize: 20,
    color: colors.space900,
    fontWeight: 'bold',
  },

  qrButtonBox: {
    paddingBottom: 32,
  },
  qrImage: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
