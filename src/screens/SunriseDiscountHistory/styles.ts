import { purple500 } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  box: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tab: {
    backgroundColor: 'white',
  },
  tabLabel: {
    color: 'black',
    textTransform: 'capitalize',
  },
  tabIndicator: {
    backgroundColor: purple500,
  },
  scene: { flex: 1 },
  loading: {
    flex: 1,
    marginTop: '50%',
  },
  labelStyle: { textTransform: 'capitalize', fontSize: 14 },
  indicatorStyle: { backgroundColor: purple500 },
  screen: { backgroundColor: '#fff' },
});
