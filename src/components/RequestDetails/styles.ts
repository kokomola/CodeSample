import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    paddingBottom: 8,
    fontSize: 20,
    color: colors.independence900,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 10,
  },
  itemText: {
    fontSize: 17,
    color: colors.independence900,
  },
});
