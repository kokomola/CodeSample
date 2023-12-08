import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { ShopProductBadgeProps } from './types';

export const ShopProductBadge: React.FC<ShopProductBadgeProps> = ({
  styleWrapper,
  children,
  styleText,
}) => {
  return (
    <View style={[styles.productFeaturedLabel, styleWrapper]}>
      <Text style={[styles.productFeaturedLabelText, styleText]}>
        {children}
      </Text>
    </View>
  );
};
