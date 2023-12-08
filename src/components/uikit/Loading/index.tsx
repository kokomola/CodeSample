import { purple500 } from '@constants/colors';
import React from 'react';
import { ActivityIndicator, Text, View, ViewStyle } from 'react-native';
import { styles as s } from './styles';

interface IProps {
  containerStyle?: ViewStyle;
  size?: 'large' | 'small';
  text?: string;
}

export const Loading: React.FC<IProps> = ({
  size = 'large',
  containerStyle,
  text,
}) => {
  return (
    <View style={[s.loadingContainer, containerStyle]}>
      <ActivityIndicator size={size} color={purple500} />
      {!!text && <Text>{text}</Text>}
    </View>
  );
};
