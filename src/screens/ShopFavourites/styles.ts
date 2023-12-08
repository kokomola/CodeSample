import { StyleSheet } from 'react-native';
import { independence200 } from '@constants/colors';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    paddingTop: 10,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '3%',
  },
  separator: {
    marginHorizontal: 16,
    height: 1,
    backgroundColor: independence200,
  },
  icon: {
    marginRight: '6%',
  },
});
