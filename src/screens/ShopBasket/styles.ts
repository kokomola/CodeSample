import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomWrapper: {
    width: '100%',
    height: 150,
    bottom: 0,
    position: 'absolute',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.22,
    elevation: 0.5,
    borderWidth: 0.1,
    borderColor: 'transparent',
  },
  pricesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
  },
  pricesItemCount: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.space900,
  },
  pricesSum: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    color: colors.space900,
  },
  buttonWrapper: {
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 24,
  },
  emptyWrapper: {
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listWrapper: {
    flex: 0.77,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: colors.space300,
    marginHorizontal: 20,
    marginTop: 20,
  },
});
