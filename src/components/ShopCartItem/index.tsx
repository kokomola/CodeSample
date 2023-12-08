import React from 'react';

import { TouchableOpacity, View } from 'react-native';

import { ShopProductItem } from '@components/ShopProductItem/ShopProductItem';

import { styles } from './styles';
import { ShopCartItemProps } from './types';
import { Icon } from '@components/uikit/Icon';
import { Stepper } from '@components/uikit/Stepper';

import * as colors from '@constants/colors';
import { ShopPriceText } from '@components/ShopPriceText/ShopPriceText';

export const ShopCartItem: React.FC<ShopCartItemProps> = ({
  title,
  color,
  option,
  price,
  count,
  imageUri,
  onPress,
  onRemove,
  onIncrement,
  onDecrement,
}) => (
  <TouchableOpacity onPress={onPress}>
    <ShopProductItem
      title={title
        .concat(color ? `, ${color}` : '')
        .concat(option ? `, ${option}` : '')}
      imageUri={imageUri}
    >
      <View style={styles.wrapper}>
        <ShopPriceText>{price}</ShopPriceText>
        <Stepper
          type="compact"
          count={count}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
        <TouchableOpacity onPress={onRemove} style={styles.iconContainer}>
          <Icon icon="trash" size="sm_md" color={colors.space400} />
        </TouchableOpacity>
      </View>
    </ShopProductItem>
  </TouchableOpacity>
);
