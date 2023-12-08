import { space500 } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  box: {
    paddingHorizontal: 16,
    marginBottom: 50,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 15,
  },
  title2: {
    marginTop: 5,
    marginBottom: 15,
  },
  inputBox: {
    paddingVertical: 8,
  },
  button: {
    marginVertical: 15,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textSmall: {
    marginTop: 15,
    color: space500,
  },
  radioBtnContainer: {
    marginBottom: 5,
  },
});
