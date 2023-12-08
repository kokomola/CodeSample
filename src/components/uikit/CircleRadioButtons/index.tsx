import * as React from 'react';
import {
  RadioButton as RadioButtonLib,
  RadioButtonProps,
} from 'react-native-radio-buttons-group';
import * as colors from '@constants/colors';
import { styles as s } from './styles';

export const CircleRadioButton: React.FC<RadioButtonProps> = (props) => {
  const { selected, layout = 'row' } = props;

  const color = selected ? colors.purple500 : colors.purple300;
  const newProps: RadioButtonProps = {
    ...props,
    color,
    labelStyle: s.lable,
    containerStyle: layout === 'row' ? s.circleContainer : {},
  };
  return <RadioButtonLib {...newProps} />;
};
