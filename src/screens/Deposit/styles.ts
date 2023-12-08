import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  qrBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 20,
  },
  addressBox: {
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  addressLabel: {
    fontSize: 16,
    color: colors.space900,
    marginBottom: 4,
  },
  addressValue: {
    fontSize: 16,
    color: colors.space900,
    marginBottom: 16,
  },
  tipBox: {
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.independence400,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  tip: {
    marginVertical: 8,
    lineHeight: 20,
  },
  tokenSelectorBox: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  networkSelectorBox: {
    paddingHorizontal: 16,
  },
  selectorLabel: {
    marginBottom: 12,
  },
});
