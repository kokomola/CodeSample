import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { ShopPriceTextProps } from './types';

export const ShopPriceText: React.FC<ShopPriceTextProps> = ({
  style,
  children,
}) => (
  <View style={style}>
    <Text style={styles.text}>
      {typeof children === 'number'
        ? children.toFixed(2)
        : parseFloat(children).toFixed(2)}{' '}
      SGC
    </Text>
  </View>
);
