import React from 'react';
import { useStore } from 'effector-react';

import { View, Text } from 'react-native';

import { $cumulativeDiscounts } from '@store/sunrise';

import { s } from './styles';

export const SunriseCumulativeDiscounts: React.FC = () => {
  const cumulativeDiscounts = useStore($cumulativeDiscounts);

  if (cumulativeDiscounts.length === 0) {
    return <Text style={s.text}>-</Text>;
  }

  const cumulativeDiscountsJSX = cumulativeDiscounts.map((o) => {
    return (
      <Text
        key={o.product}
        style={s.discountList}
      >{`${o.product} - ${o.amount}`}</Text>
    );
  });
  return <View style={s.discountListBox}>{cumulativeDiscountsJSX}</View>;
};
