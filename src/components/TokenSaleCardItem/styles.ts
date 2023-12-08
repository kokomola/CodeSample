import { StyleSheet } from 'react-native';
import { space400 } from '@constants/colors';

export const styles = StyleSheet.create({
  cardWrapper: {
    borderWidth: 1,
    padding: 20,
    borderColor: space400,
    borderRadius: 10,
  },
  infoRow: {
    paddingVertical: 0,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  description: {
    marginVertical: 15,
  },
  value: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 5,
  },
});
