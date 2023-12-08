import { independence700, purple100, purple500 } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // general styles for all landing screens
  sav: {
    flex: 1,
  },
  sv: {
    paddingHorizontal: 16,
  },
  ambassadorHint: {
    textAlign: 'center',
    color: independence700,
    marginBottom: '8%',
  },
  amirPuppyMockBox: {
    marginTop: '6%',
    marginBottom: '10%',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: '1%',
    marginBottom: '5%',
  },
  titleMain: {
    marginTop: '3%',
    marginBottom: '5%',
    fontSize: 24,

    fontWeight: 'bold',
  },
  title: {
    marginBottom: '5%',
    fontSize: 20,

    fontWeight: 'bold',
  },
  text: {
    marginBottom: '5%',
    lineHeight: 23,

    textAlign: 'justify',
  },
  // bottomsheet styles

});
