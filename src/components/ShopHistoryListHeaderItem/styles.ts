import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  main: {
    height: 42,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  separator: {
    marginHorizontal: 16,
    height: 1,
    backgroundColor: colors.independence200,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
