import { purple500 } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sv: {
    flex: 1,
  },
  sav: {
    flex: 1,
  },
  parnterLink: {
    alignSelf: 'flex-start'
  },
  box: {
    marginHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  iconBox: {
    paddingTop: 28,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  labelStyle: { textTransform: 'capitalize', fontSize: 14 },
  indicatorStyle: { backgroundColor: purple500 },
  screen: { backgroundColor: '#fff' },
});
