import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';
import { fonts } from '@constants/fonts';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  sv: {
    flex: 1,
  },
  box: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  inputBox: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  as: {
    marginTop: 16,
  },
  fullAmountButton: {
    marginTop: 20,
    marginBottom: 30,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  info: {
    marginTop: 25,
  },
  button: {
    marginTop: 25,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    paddingLeft: 10,
    color: colors.space900,
    fontSize: 16,
  },
  alert: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 25,
    ...fonts.semibold
  }
});
