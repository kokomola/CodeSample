import { space500 } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
    marginHorizontal: 16,
  },
  header: {
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  cardContainer: {
    marginVertical: 10,
  },
  text: {
    marginBottom: 5,
    paddingBottom: 5,
    color: space500,
  },
});
