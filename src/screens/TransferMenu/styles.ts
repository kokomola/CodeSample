import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  sv: {
    flex: 1,
  },
  box: {
    padding: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.independence200,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: colors.space900,
    fontWeight: '600',
    marginLeft: 16,
  },
});
