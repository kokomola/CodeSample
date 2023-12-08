import { StyleSheet } from 'react-native';
import { isIOS } from './platform';

// default fonts for RN https://github.com/react-native-training/react-native-fonts
type TFontWight =
  | ('bold' | 'normal' | '100' | '200' | '300' | '400' | '500')
  | ('600' | '700' | '800' | '900' | undefined);
type TFontStyles =
  | 'thin'
  | 'light'
  | 'regular'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extraBold';

type TFonts = Record<
  TFontStyles,
  { fontWeight: TFontWight } | { fontFamily: string }
>;

export const fonts: TFonts = isIOS
  ? StyleSheet.create({
      thin: {
        fontWeight: '100',
      },
      light: {
        fontWeight: '300',
      },
      regular: {
        fontWeight: '400',
      },
      medium: {
        fontWeight: '500',
      },
      semibold: {
        fontWeight: '600',
      },
      bold: {
        fontWeight: '700',
      },
      extraBold: {
        fontWeight: '800',
      },
    })
  : StyleSheet.create({
      thin: {
        fontFamily: 'sans-serif-thin',
      },
      light: {
        fontFamily: 'sans-serif-light',
      },
      regular: {
        fontFamily: 'sans-serif',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
      },
      semibold: {
        fontFamily: 'bold',
      },
      bold: {
        fontWeight: 'bold',
      },
      extraBold: {
        fontWeight: 'bold',
      },
    });
