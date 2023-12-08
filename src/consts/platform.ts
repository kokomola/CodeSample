import { Dimensions, Platform } from 'react-native';
import * as colors from './colors';
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const platform = isAndroid ? 'android' : 'ios';

export const heightScreen = Dimensions.get('window').height;
export const widthScreen = Dimensions.get('window').width;
export const multiplier = heightScreen < 580 ? 0.7 : 1;
export const keyboardHeight = 260;

export const shadow = isIOS
  ? {
    shadowColor: colors.shadowColor,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    backgroundColor: colors.white,
  }
  : {
    elevation: 8,
    backgroundColor: colors.white,
  };
