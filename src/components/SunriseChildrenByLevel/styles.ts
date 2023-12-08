import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';
import { fonts } from '@constants/fonts';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    ...fonts.bold,
    fontSize: 20,
    color: colors.space900,
  },
  separator: {
    marginHorizontal: 16,
    height: 1,
    backgroundColor: colors.independence200,
  },
  child: {
    paddingVertical: 25,
    paddingRight: 25,
    borderBottomColor: colors.independence200,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  text: {
    ...fonts.medium,
    color: 'black',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
