import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.space200,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
    height: 28,
  },
  wrapperLarge: {
    height: 44,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  image: {
    height: 20,
    width: 20,
  },
  text: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: 6,
    minWidth: 24,
  },
});
