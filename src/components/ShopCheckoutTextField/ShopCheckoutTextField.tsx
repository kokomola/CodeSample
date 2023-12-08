import React from 'react';
import { View, TextInput } from 'react-native';

import { useStore } from 'effector-react';
import { $orderInfo, changeOrderInfo } from '@store/shopCheckout';

import { styles as s } from './styles';
import { ShopOrderTextFieldProps } from './types';

export const ShopCheckoutTextField: React.FC<ShopOrderTextFieldProps> = (
  props
) => {
  const {
    placeholder = '',
    autoCapitalize,
    type,
    onFocus,
    keyboardType,
    maxLength,
  } = props;
  const value = useStore($orderInfo);

  return (
    <View style={s.container}>
      <TextInput
        maxLength={maxLength}
        keyboardType={keyboardType}
        onFocus={onFocus}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        value={value[type]}
        onChangeText={(text) => changeOrderInfo({ type, value: text })}
      />
      <View style={s.separator} />
    </View>
  );
};
