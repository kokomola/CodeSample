import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';
import { space900 } from '@constants/colors';

export const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  sv: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 13,
    // shadow effect
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.22,
    elevation: 2,
  },
  btnContainer: {
    width: '45%',
  },
  sectionHeader: {
    marginTop: 25,
    marginLeft: 16,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: space900,
  },
  listHeader: {
    marginTop: 30,
    paddingHorizontal: 17,
  },
  titleText: {
    color: space900,
    fontSize: 20,
    fontWeight: 'bold',
  },
  pricesText: { textAlign: 'center', marginTop: 20 },
  item: {
    height: 40,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 16,
    fontSize: 16,
    color: space900,
  },
  loadingIndicatorContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicatorText: {
    paddingTop: 10,
  },
  trackStyle: {
    height: 4,
    marginTop: -1,
  },
});
