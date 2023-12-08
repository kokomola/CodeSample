import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, IconName, IconColor } from '@components/uikit/Icon';

import { s } from './styles';
import * as colors from '@constants/colors';

type IconButtonProps = {
  icon: IconName;
  color?: IconColor;
  onPress?: any;
  disabled?: boolean;
  styles?: any;
};

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    onPress,
    color = colors.purple500,
    icon = 'flare',
    disabled = false,
    styles = null,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[s.box, styles]}
    >
      <Icon icon={icon} color={color} />
    </TouchableOpacity>
  );
};
