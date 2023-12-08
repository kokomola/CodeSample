import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  separator: {
    marginHorizontal: 16,
    height: 1,
    backgroundColor: colors.independence200,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: colors.independence200,
    marginVertical: 13,
  },
  emptyWrapper: { justifyContent: 'center', alignItems: 'center' },
  emptyImage: { width: 100, height: 100 },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 32,
  },
  radioButtonsContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  buttonWrapper: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  ordersNotFound: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '30%',
  },
  loadingIndicatorContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '40%',
  },
  loadingIndicatorText: {
    paddingTop: 10,
  },
});
