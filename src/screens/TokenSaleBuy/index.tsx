import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, useStoreMap } from 'effector-react';

import { SafeAreaView, Text, View, Keyboard, ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';

import {
  RadioButton,
  RadioButtonsContainer,
} from '@components/uikit/RadioButtons';
import { Button } from '@components/uikit';
import { BackButton } from '@components/layout/BackButton';
import { Input } from '@components/uikit/Input';
import { InputError } from '@components/uikit/InputError';
import { VerifyCodeBottomSheet } from '@components/VerifyCodeBottomSheet';
import { MaintenanceView } from '@components/MaintenanceView';
import { Currencies } from '@store/tokenSale/type';
import { isAndroid } from '@constants/platform';

import {
  $amount,
  $tokenSaleOffers,
  $amountInFocus,
  $amountErrors,
  onChangeAmount,
  focusAmount,
  blurAmount,
  buyToken,
  $currency,
  $amountToGet,
  $isFormValid,
  setTokenId,
  changeCurrency,
} from '@store/tokenSale';
import { blurTokenSaleBuyScreen } from '@store/app';
import {
  AvailabilityBoxProps,
  TokenSaleBuyProps,
  TotalAmountInputProps,
} from './types';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';
import { styles as s } from './styles';

export const options = [
  {
    label: Currencies.USDT,
    value: Currencies.USDT,
  },
  {
    label: Currencies.ETH,
    value: Currencies.ETH,
  },
  {
    label: Currencies.BTC,
    value: Currencies.BTC,
  },
  {
    label: Currencies.SGC,
    value: Currencies.SOL,
  },
];

const AmountInput: React.FC = () => {
  const currency = useStore($currency);

  const { t } = useTranslation('TokenSaleBuy');
  const value = useStore($amount);
  const inFocus = useStore($amountInFocus);
  const errors = useStore($amountErrors);

  return (
    <View style={s.inputBox}>
      <Input
        value={value}
        onChangeText={onChangeAmount}
        onFocus={focusAmount}
        onBlur={blurAmount}
        placeholder={t('amountPlaceholder')}
        focused={inFocus}
        keyboardType="numeric"
        textRight={options.find((option) => option.value === currency)?.label}
      />
      <InputError visible={inFocus} error={errors[0]} replace={{ currency }} />
    </View>
  );
};

const TotalAmountInput: React.FC<TotalAmountInputProps> = (props) => {
  const { code } = props;

  const value = useStore($amountToGet);

  return (
    <View style={s.inputBox}>
      <Input
        value={value?.amount.toString() || '0'}
        textRight={code}
        disabled={true}
      />
    </View>
  );
};

const AvailabilityBox: React.FC<AvailabilityBoxProps> = (props) => {
  const { totalSupply, sold, code } = props;

  const [t] = useTranslation('TokenSale');

  const availability = totalSupply - sold;

  return (
    <View style={s.infoBox}>
      <Text>{t('available')}</Text>
      <Text>
        <Text>{`${availability} ${code}`}</Text>
      </Text>
    </View>
  );
};

export const TokenSaleBuy: React.FC<TokenSaleBuyProps> = (props) => {
  const { navigation, route } = props;

  const { id } = route.params;

  const [t] = useTranslation('TokenSaleBuy');
  const currency = useStore($currency);

  const tokenSaleOffer = useStoreMap({
    store: $tokenSaleOffers,
    keys: [id],
    fn: (offer, [f]) => offer.find((o) => o.id === f) || null,
  });

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      setTokenId(id);
    });

    navigation.addListener('blur', () => {
      blurTokenSaleBuyScreen();
    });
  }, [navigation, tokenSaleOffer, id]);

  const amountToGet = useStore($amountToGet);
  const isFormValid = useStore($isFormValid);

  if (tokenSaleOffer === null) return <MaintenanceView />;

  const filteredOptions =
    tokenSaleOffer?.availablePayments.length === 0
      ? []
      : options.filter((option) =>
          tokenSaleOffer.availablePayments
            .map((payment) => payment.toLowerCase())
            .includes(option.value.toLowerCase()),
        );

  const updateCurrency = (selectedCurrency: keyof typeof Currencies) => () =>
    changeCurrency(selectedCurrency);

  return (
    <SafeAreaView style={s.sav}>
      <BackButton />

      <AKeyboardAvoidingView>
        <ScrollView>
          <View style={s.box}>
            <Text style={s.title}>{`${t('Buy')} ${tokenSaleOffer.code}`}</Text>

            <Text style={s.title2}>{t('currency')}</Text>

            <RadioButtonsContainer containerStyle={s.radioBtnContainer}>
              {filteredOptions.map((option) => (
                <RadioButton
                  key={option.value}
                  text={option.label}
                  onPress={updateCurrency(option.value)}
                  active={option.value === currency}
                />
              ))}
            </RadioButtonsContainer>

            <Text style={s.textSmall}>{t('give')}</Text>

            <AmountInput />

            <Text style={s.textSmall}>{t('get')}</Text>

            <TotalAmountInput
              code={tokenSaleOffer.code}
              price={tokenSaleOffer.price}
            />

            <Button
              text={`${t('Buy')} ${tokenSaleOffer.code} `}
              onPress={() =>
                buyToken({
                  id: tokenSaleOffer.id,
                  amount: amountToGet.amount,
                  fund: amountToGet.fund as keyof typeof Currencies,
                })
              }
              customStyle={s.button}
              disabled={!isFormValid}
            />

            <AvailabilityBox
              totalSupply={tokenSaleOffer.totalSupply}
              sold={tokenSaleOffer.sold}
              code={tokenSaleOffer.code}
            />
          </View>
        </ScrollView>
      </AKeyboardAvoidingView>

      <VerifyCodeBottomSheet />
    </SafeAreaView>
  );
};
