import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import { Text, View, Keyboard } from 'react-native';

import { Input } from '@components/uikit/Input';
import { InputError } from '@components/uikit/InputError';
import { Button } from '@components/uikit';

import { isAndroid } from '@constants/platform';

import {
  $price,
  $priceErrors,
  $priceInFocus,
  blurPrice,
  changePrice,
  focusPrice,
  onChangePrice,
  updateToken,
  $isFormValid,
} from '@store/tokenSaleEdit';

import { styles as s } from './styles';
import { TokenSalePriceInputProps } from './types';

export const TokenSalePriceInput: React.FC<TokenSalePriceInputProps> = (
  props
) => {
  const { price, tokenId } = props;

  const { t } = useTranslation('TokenSaleEdit');

  const value = useStore($price);
  const inFocus = useStore($priceInFocus);
  const errors = useStore($priceErrors);

  const isFormValid = useStore($isFormValid);

  React.useEffect(() => {
    changePrice(`${price}`);
  }, [price]);

  return (
    <View>
      <Text style={s.title2}>{t('priceTitle')}</Text>

      <View style={s.inputBox}>
        <Text>{t('newPrice')}</Text>

        <Input
          value={value}
          onChangeText={onChangePrice}
          onFocus={focusPrice}
          onBlur={blurPrice}
          placeholder={t('amountPlaceholder')}
          focused={inFocus}
          keyboardType="numeric"
        />

        <InputError visible={inFocus} error={errors[0]} />

        <Button
          text={t('save')}
          onPress={() => {
            Keyboard.dismiss();
            updateToken({ id: tokenId, body: { price: Number(value) } });
          }}
          disabled={!isFormValid}
          customStyle={s.button}
        />
      </View>
    </View>
  );
};
