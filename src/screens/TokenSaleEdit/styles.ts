import { space400, space500 } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
    marginHorizontal: 16,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    marginHorizontal: 16,

    borderBottomWidth: 1,
    borderBottomColor: space400,
  },
  category: {
    fontWeight: 'bold',
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBoxItemText: {
    textAlign: 'right',
    paddingRight: 15,
    color: space500,
  },
});
