import { StyleSheet } from 'react-native';

import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tfaStatusBox: {
    paddingBottom: 32,
  },
  text: {
    fontSize: 16,
    color: colors.space900,
    paddingBottom: 32,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: -4,
  },
  buttonBox: {
    flex: 1,
    paddingHorizontal: 4,
  },
});
