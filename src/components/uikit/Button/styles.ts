import { purple1000 } from '@constants/colors';
import { fonts } from '@constants/fonts';
import { TextStyle } from 'react-native';
import { DynamicValue } from 'react-native-dynamic';

import * as colors from '../../../consts/colors';

const buttonColor = {
  primary: {
    backgroundColor: new DynamicValue(colors.purple500, colors.purple500),
  },
  secondary: {
    backgroundColor: new DynamicValue(colors.purple200, colors.independence700),
  },
  ghost: {
    backgroundColor: new DynamicValue(colors.transparent, colors.transparent),
  },
  outline: {
    backgroundColor: new DynamicValue(colors.white, colors.white),
    borderWidth: 1,
    borderColor: colors.purple500
  }
};

const disabledButtonColor = {
  primary: {
    backgroundColor: new DynamicValue(colors.space400, colors.space400),
  },
  secondary: {
    backgroundColor: new DynamicValue(colors.space400, colors.space400),
  },
  ghost: {
    backgroundColor: new DynamicValue(colors.transparent, colors.transparent),
  },
  outline: {
    backgroundColor: new DynamicValue(colors.space400, colors.space400),
  },
};

const textColor = {
  primary: {
    color: new DynamicValue(colors.white, colors.white),
  },
  secondary: {
    color: new DynamicValue(colors.purple500, colors.white),
  },
  ghost: {
    color: new DynamicValue(colors.purple500, colors.purple500),
  },
  outline: {
    color: new DynamicValue(colors.purple500, colors.purple500),
  },
};

const disabledTextColor = {
  primary: {
    color: new DynamicValue(colors.space500, colors.space500),
  },
  secondary: {
    color: new DynamicValue(colors.space500, colors.space500),
  },
  ghost: {
    color: new DynamicValue(colors.space500, colors.space500),
  },
  outline: {
    color: new DynamicValue(colors.space500, colors.space500),
  },
};

const commonButtonStyles = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  padding: 10,
  borderRadius: 8,
  height: 48
};

const fillButtonStyles = {
  alignSelf: 'stretch',
};

const commonTextStyles: TextStyle = {
  height: 24,
  lineHeight: 24,
  paddingHorizontal: 6,
  ...fonts.medium,
};

export {
  buttonColor,
  disabledButtonColor,
  textColor,
  disabledTextColor,
  commonButtonStyles,
  fillButtonStyles,
  commonTextStyles,
};
