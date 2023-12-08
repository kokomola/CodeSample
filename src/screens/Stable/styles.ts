import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const s = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  buttonsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBox: {
    marginRight: 20,
  },
  closedAccountBox: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 1,
    flexBasis: 0,
    justifyContent: 'space-around',
    backgroundColor: '#7a7f8a',
    borderRadius: 8,
  },
  closedAccountlabel: {
    color: colors.white,
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
});
