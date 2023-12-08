import { StyleSheet } from 'react-native';
import * as colors from '@constants/colors';
import { isViewportHeightSmall } from '@utils/isScreenSmall';
import { isIOS } from '@constants/platform';
import { fonts } from '@constants/fonts';

export const styles = StyleSheet.create({
  sav: {
    flex: 1,
  },
  backgroundTop: {
    flex: 0.55,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover'
  },
  iconText: {
    ...fonts.bold,
    textTransform: 'uppercase',
    color: colors.purple1000,
    fontSize: 30,
    position: 'absolute',
    bottom: 0,
  },
  pointWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 15,
    marginTop: 15,
  },
  point: {
    marginHorizontal: 15,
    alignSelf: 'center',
  },
  pointText: {
    ...fonts.medium,
    color: '#111111',
    fontSize: 14
  },
  backgroundBottom: {
    flex: 0.4,
    flexDirection: 'column',
    marginTop: 'auto',
    justifyContent: 'space-evenly',
    resizeMode: 'cover',
    zIndex: 0
  },
  box: {
    margin: 15,
    zIndex: 1,
  },
  buttomBox: {
    marginVertical: 15,
    zIndex: 2,
  },
  versionInfo: {
    color: 'black',
    textAlign: 'center',
    fontSize: 13,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  hostInfo: {
    color: 'black',
    fontSize: 13,
    textAlign: 'center',
    ...fonts.bold
  },
});
