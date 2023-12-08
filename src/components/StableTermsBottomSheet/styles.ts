import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  actionSheetBox: {
    marginTop: 7,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionSheetTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    marginTop: 7,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionSheetLabel: {
    fontSize: 16,
    color: '#000',
  },
  actionSheetValue: {
    fontSize: 15,
    color: '#000',
    width: '50%',
  },
});
