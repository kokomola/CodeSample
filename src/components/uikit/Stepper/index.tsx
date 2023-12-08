import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, IconSize } from '@components/uikit/Icon';
import * as colors from '@constants/colors';
import { styles as s } from './styles';

interface IProps {
  type: 'compact' | 'large';
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const Stepper: React.FC<IProps> = ({
  type,
  count,
  onIncrement,
  onDecrement,
}) => {
  const isCompact = type === 'compact';

  const size: IconSize = isCompact ? 'sm_md' : 'md';
  const color = isCompact ? colors.independence700 : colors.space400;
  return (
    <View style={[s.wrapper, type === 'large' && s.wrapperLarge]}>
      <TouchableOpacity style={s.image} onPress={onDecrement}>
        <Icon icon="minus" size={size} color={color} />
      </TouchableOpacity>
      <Text style={s.text}>{count}</Text>
      <TouchableOpacity style={s.image} onPress={onIncrement}>
        <Icon icon="plus" size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
};
