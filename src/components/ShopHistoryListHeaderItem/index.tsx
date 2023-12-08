import * as React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { styles as s } from './styles';
import { OrdersHistoryListHeaderItemProps } from './types';
import { ShopProductBadge } from '@components/ShopProductBadge/ShopProductBadge';

export const OrdersHistoryListHeaderItem: React.FC<OrdersHistoryListHeaderItemProps> = ({
  status,
  id,
}) => {
  const [t] = useTranslation('OrdersHistoryListHeaderItem');

  let color;
  let textColor;

  switch (status) {
    case 'done':
      color = '#E6FFE6';
      textColor = '#59981A';
      break;

    case 'cancelled':
      color = '#ffcccb';
      textColor = '#fa4c4c';
      break;

    default:
      color = '#d7ebfe';
      textColor = '#2b93f8';
      break;
  }

  return (
    <View>
      <View style={s.main}>
        <Text style={s.text}>№ {id}</Text>
        <ShopProductBadge
          styleText={{ color: textColor }}
          styleWrapper={{ backgroundColor: color }}
        >
          {t(status)}
        </ShopProductBadge>
      </View>
      <View style={s.separator} />
    </View>
  );
};
