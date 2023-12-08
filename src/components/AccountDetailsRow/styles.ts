import { StyleSheet, Dimensions } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.independence200,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.space900,
    flexWrap: 'wrap',
  },
  label: {
    marginTop: 2,
    fontSize: 12,
    color: colors.independence500,
  },
  details: {
    width: Dimensions.get('window').width - 32 - 44,
  },
  icon: {
    width: 24,
    flex: 0,
  },
});
