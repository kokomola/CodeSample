import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const s = StyleSheet.create({
  btmSheetBox: {
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  btmSheetTitle: {
    paddingVertical: 5,
    fontSize: 20,
    color: colors.independence900,
    fontWeight: 'bold',
  },
  btmSheetText: {
    paddingTop: 8,
  },
  btmSheetBtnBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btnSheetBtnWrapper: {
    width: '45%',
    marginBottom: 35,
  },
  btmSheetBtn: {
    flex: 1,
  },

});
