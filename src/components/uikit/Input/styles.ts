import { StyleSheet } from 'react-native';
// import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import * as colors from '../../../consts/colors';
import { DynamicStyleSheetProps } from './index';

export const getDynamicStyles = (props: DynamicStyleSheetProps): any => {
  const { disabled, error, focused, warning } = props;

  return StyleSheet.create({
    box: {
      display: 'flex',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(60, 60, 67, 0.29)',
      ...(warning && {
        borderBottomColor: colors.orangeYellow,
      }),
      ...(error && {
        borderBottomColor: colors.fieryRose,
      }),
      ...(focused && {
        borderBottomColor: colors.purple500,
      }),
      ...(disabled && {
        borderBottomColor: colors.independence300,
      }),
    },
    input: {
      flex: 1,
      height: 44,
      paddingVertical: 9,
      fontSize: 16,
      color: colors.space900,
      ...(disabled && {
        color: colors.space400,
      }),
    },
    iconWrapper: {
      padding: 10,
    },
    leftIconWrapper: {
      paddingLeft: 0,
    },
    rightIconWrapper: {
      paddingRight: 0,
    },
    textWrapper: {
      justifyContent: 'center',
    },
    textRight: {
      fontSize: 16,
    },
  });
};
