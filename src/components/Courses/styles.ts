import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';
import { shadow } from '@constants/platform';

export const styles = StyleSheet.create({
  box: {
    ...shadow,
    shadowRadius: 10,
  },
  labels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  labelPair: {
    fontFamily: 'Exo2-Regular',
    color: colors.independence500,
    flexBasis: '30%',
    flexGrow: 0,
  },
  labelBuy: {
    fontFamily: 'Exo2-Regular',
    color: colors.independence500,
    flexBasis: '35%',
    textAlign: 'right',
    flexGrow: 0,
  },
  labelSell: {
    fontFamily: 'Exo2-Regular',
    color: colors.independence500,
    flexBasis: '35%',
    textAlign: 'right',
    flexGrow: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 8,
    marginBottom: 8,
  },
  itemName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexBasis: '30%',
    flexGrow: 0,
  },
  itemNameText: {
    fontFamily: 'Exo2-Regular',
    color: colors.independence500,
    textTransform: 'uppercase',
  },
  itemBuy: {
    flexDirection: 'row',
    alignItems: 'center',
    flexBasis: '35%',
    flexGrow: 0,
    justifyContent: 'flex-end',
  },
  itemBuyText: {
    fontFamily: 'Exo2-Regular',
    color: colors.oceanGreen,
  },
  itemBuyTicker: {
    fontFamily: 'Exo2-Regular',
    marginLeft: 3,
    textTransform: 'uppercase',
    color: colors.oceanGreen,
  },
  itemSell: {
    flexDirection: 'row',
    alignItems: 'center',
    flexBasis: '35%',
    flexGrow: 0,
    justifyContent: 'flex-end',
  },
  itemSellText: {
    fontFamily: 'Exo2-Regular',
    color: colors.fieryRose,
  },
  itemSellTicker: {
    fontFamily: 'Exo2-Regular',
    marginLeft: 3,
    textTransform: 'uppercase',
    color: colors.fieryRose,
  },
});
