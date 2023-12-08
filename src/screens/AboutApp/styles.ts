import { independence300 } from '@constants/colors';
import { widthScreen } from '@constants/platform';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  logoContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  smallText: {
    marginTop: 10,
  },
  listBox: {
    flex: 1,
    paddingHorizontal: 14,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  listItemText: {
    paddingLeft: '2%',
    maxWidth: widthScreen - 100,

    textAlign: 'left',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: independence300,
  },
  contentContainer: {
    paddingBottom: 15,
  },
});
