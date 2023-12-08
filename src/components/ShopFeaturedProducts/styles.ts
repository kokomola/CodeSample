import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    marginBottom: 5,
  },
  recommendedProductTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  separator: {
    marginHorizontal: 16,
    height: 1,
    backgroundColor: colors.independence200,
  },
  screenTitleBox: {
    backgroundColor: '#fff',
  },
  titlePanelBox: { flexDirection: 'row', paddingHorizontal: 10 },
  titlePanelButton: { flexGrow: 1, margin: 4 },
});
