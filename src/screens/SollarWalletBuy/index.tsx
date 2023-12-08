import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import {
  $amount,
  $amountErrors,
  $amountInFocus,
  $amountTouched,
  $isFormValid,
  $price,
  blurAmount,
  buySollar,
  chooseForFullSum,
  focusAmount,
  onChangeAmount,
} from '@store/sollars';

import { Button } from '@components/uikit';
import { Input } from '@components/uikit/Input';
import { InputError } from '@components/uikit/InputError';
import { BackButton } from '@components/layout/BackButton';

import { SollarWalletBuyProps } from './types';
import { styles as s } from './styles';
import { Account } from '@components/uikit/AccountSelector/Account';
import { $usdtWallet } from '@store/wallets';
import {
  blurSollarWalletBuyScreen,
  focusSollarWalletBuyScreen,
} from '@store/app';
import { VerifyCodeBottomSheet } from '@components/VerifyCodeBottomSheet';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';

interface IPlaceholder {
  text: string;
  align: 'left' | 'right';
  transform?: 'uppercase' | 'none';
}

const Placeholder: React.FC<IPlaceholder> = ({ text, align, transform }) => {
  const uppercase: TextStyle = {
    textTransform: transform,
  };
  const position: TextStyle = { [align]: 0 };

  return <Text style={[s.placeholder, position, uppercase]}>{text}</Text>;
};

const AmountInput: React.FC = () => {
  const { t } = useTranslation('SollarWallet');

  const value = useStore($amount);
  const inFocus = useStore($amountInFocus);
  const touched = useStore($amountTouched);
  const errors = useStore($amountErrors);

  return (
    <View style={s.inputBox}>
      <View>
        <Input
          style={s.customStyle}
          textAlign="right"
          value={value}
          onChangeText={onChangeAmount}
          onFocus={focusAmount}
          onBlur={blurAmount}
          focused={inFocus}
          keyboardType="numeric"
        />
        <Placeholder text={t('gettingSollar')} align="left" />
        <Placeholder text="SGC" align="right" transform="uppercase" />
      </View>
      <InputError visible={inFocus || touched} error={errors[0]} />
    </View>
  );
};

const PriceInput: React.FC = () => {
  const [t] = useTranslation('SollarWallet');

  const value = useStore($price);

  return (
    <View style={s.inputBox}>
      <View>
        <Input
          style={s.customStyle}
          textAlign="right"
          value={value}
          keyboardType="numeric"
          editable={false}
        />
        <Placeholder text={t('givingSollar')} align="left" />
        <Placeholder text="usdt" align="right" transform="uppercase" />
      </View>
    </View>
  );
};

export const SollarWalletBuy: React.FC<SollarWalletBuyProps> = (props) => {
  const { navigation } = props;

  const [t] = useTranslation('SollarWallet');

  useEffect(
    () => navigation.addListener('focus', () => focusSollarWalletBuyScreen()),
    [navigation]
  );
  useEffect(
    () => navigation.addListener('blur', () => blurSollarWalletBuyScreen()),
    [navigation]
  );

  const usdtWallet = useStore($usdtWallet);
  const isFormValid = useStore($isFormValid);

  return (
    <SafeAreaView style={s.sav}>
      <VerifyCodeBottomSheet />
      <AKeyboardAvoidingView>
        <ScrollView>
          <BackButton text={t('titleBuyTether')} />
          <View style={s.box}>
            <Account item={usdtWallet} index={0} />
            <View style={s.offset} />
            <AmountInput />
            <PriceInput />
            <TouchableOpacity
              style={s.fullAmountButton}
              onPress={chooseForFullSum}
            >
              <Text style={s.text}>{t('fullAmountTether')}</Text>
            </TouchableOpacity>
            <Button
              text={t('exchangeSollar')}
              onPress={buySollar}
              disabled={!isFormValid}
            />
          </View>
        </ScrollView>
      </AKeyboardAvoidingView>
    </SafeAreaView>
  );
};
