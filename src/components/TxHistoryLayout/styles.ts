import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  txsBox: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  //
  backButtonBox: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    color: colors.space900,
  },
  backButtonText: {
    paddingLeft: 10,
  },
});
