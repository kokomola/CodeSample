import { independence400 } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  publishedBox: {
    borderBottomWidth: 1,
    borderBottomColor: independence400,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56,
  },
  title2: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  button: {
    marginTop: 15,
  },
});
