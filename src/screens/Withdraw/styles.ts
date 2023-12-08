import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  sv: {
    flex: 1,
  },
  inputBox: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonBox: {
    padding: 16,
  },
  fullAmountButton: {
    width: 100,
    marginLeft: 16,
    marginTop: 8,
    paddingVertical: 8,
  },
  fullAmountButtonText: {
    fontSize: 14,
    color: '#000000',
  },
  feeDescription: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    fontSize: 14,
    color: colors.space500,
  },
  tip: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: colors.orangeYellow,
    borderRadius: 8,
  },
  tipHead: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.space900,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.space900,
  },
  fee: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feeText: {
    fontSize: 16,
    color: colors.space900,
    fontWeight: '600',
  },
  networkSelectorBox: {
    marginHorizontal: 16,
  },
  tokenSelectorBox: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  selectorLabel: {
    marginBottom: 12,
  },
  warningBox: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
});
