import { StyleSheet } from 'react-native';

import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 16,
    color: colors.space900,
    flex: 1,
    height: 24,
  },
  itemIcon: {
    paddingRight: 16,
  },
  itemCheckIcon: {
    paddingLeft: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.independence300,
  },
});
