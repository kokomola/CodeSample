import { StyleProp, ViewStyle } from 'react-native';
import { DynamicStyleSheet } from 'react-native-dynamic';
import {
  buttonColor,
  commonButtonStyles,
  commonTextStyles,
  disabledButtonColor,
  disabledTextColor,
  fillButtonStyles,
  textColor,
} from './styles';
import { TDynamicStyle } from './types';

type TProps = {
  type: 'primary' | 'secondary' | 'ghost';
  disabled: boolean;
  fill: boolean;
};

type TTest = {
  button: StyleProp<ViewStyle>;
  text: any;
};

export const getDynamicStyles = (props: TProps) => {
  const { type = 'primary', disabled = false, fill = true } = props;

  return new DynamicStyleSheet<TDynamicStyle>({
    button: {
      ...commonButtonStyles,
      ...buttonColor[type],
      ...(disabled && disabledButtonColor[type]),
      ...(fill && fillButtonStyles),
    },
    text: {
      ...commonTextStyles,
      ...textColor[type],
      ...(disabled && disabledTextColor[type]),
    },
  });
};
