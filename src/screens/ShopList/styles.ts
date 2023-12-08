import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  flatList: {
    backgroundColor: colors.white,
  },
  sv: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleButtonsBox: {
    marginHorizontal: -10,
    flexDirection: 'row',
  },
  titleButton: {
    paddingHorizontal: 10,
  },
  separator: {
    marginHorizontal: 16,
    height: 1,
    backgroundColor: colors.independence200,
  },
  screenTitleBox: {
    backgroundColor: '#fff',
  },
  indicator: {
    flex: 1,
  },
  emptyText: {
    marginTop: '50%',
    fontSize: 15,

    textAlign: 'center',
  },
  titlePanelBox: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  titlePanelButton: { flexGrow: 1, margin: 4 },
  loadingIndicatorContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicatorText: {
    paddingTop: 10,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: 5,
    width: 18,
    height: 18,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 2,
    backgroundColor: colors.purple500,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
  },
  bannerBox: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  bannerBoxHidden: {
    display: 'none',
  },
  bannerImage: {
    height: 120,
    borderRadius: 8,
  },
  box: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});
