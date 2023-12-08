import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ShopPriceText } from '@components/ShopPriceText/ShopPriceText';
import { ShopProductItem } from '@components/ShopProductItem/ShopProductItem';

import { styles as s } from './styles';
import { OrdersHistoryListItemProps } from './types';

export const OrdersHistoryListItem: React.FC<OrdersHistoryListItemProps> = (
  props
) => {
  const { title, imageUri, quantity, price, optionName, colorName } = props;
  const [t] = useTranslation('OrdersHistoryListItem');

  return (
    <ShopProductItem title={title} imageUri={imageUri}>
      <Text>
        {optionName && colorName
          ? `${optionName + ', ' + colorName}`
          : `${optionName || colorName || ''}`}
      </Text>

      <View style={s.main}>
        <Text style={s.text}>
          {quantity} {t('items')}
        </Text>
        <ShopPriceText style={s.text}>{price}</ShopPriceText>
      </View>
    </ShopProductItem>
  );
};
