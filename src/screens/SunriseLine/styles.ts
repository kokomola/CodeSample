import { space900 } from '@constants/colors';
import { fonts } from '@constants/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  sv: {
    flex: 1,
  },
  box: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: '1%',
    color: 'black',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: '1%',
    color: 'black',
  },
  text: {
    color: space900,
    fontSize: 14,
    ...fonts.bold,
  },
  level: {
    paddingTop: 20,
    justifyContent: 'space-between',
  },
});
