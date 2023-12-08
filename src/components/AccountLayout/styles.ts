import { StyleSheet } from 'react-native';
import { fonts } from '@constants/fonts';
import * as colors from '@constants/colors';

const t = fonts.bold;

export const styles = StyleSheet.create({
  sectionTitle: {
    paddingBottom: 20,
    fontSize: 20,
    color: colors.space900,
    //fontWeight: '800', // by Daria
    ...fonts.bold,
  },
  //
  balanceBox: {
    paddingTop: 14,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  //
  actionsPanelBox: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  //
  detailsBox: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  //
  txsBox: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  //
  noTxsMockBox: {
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTxsText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    color: colors.space900,
  },
});
