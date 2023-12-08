import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  backButtonBox: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    paddingLeft: 10,
    color: colors.space900,
    fontSize: 16,
  },
});
