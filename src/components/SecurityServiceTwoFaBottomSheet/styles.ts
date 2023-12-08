import { StyleSheet } from 'react-native';

import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.space900,
    textAlign: 'center',
    marginBottom: 12,
  },
  tip: {
    fontSize: 16,
    color: colors.space900,
    textAlign: 'center',
    margin: 12,
  },
  inputBox: {
    width: 220,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 40,
  },
  input: {
    height: 56,
    fontSize: 32,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 4,
  },
  error: {
    textAlign: 'center',
  },
});
