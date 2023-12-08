/* eslint-disable camelcase */
import * as React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { CircleIcon } from '@components/uikit/Icon';

import { styles as s } from './styles';
import { AccountProps } from './types';
import { fundToCurrency } from '@utils/maps';
import { Fund } from '@store/wallets/types';
import { fix } from '@utils/numbers/fix';
import { iconColors } from '@constants/colors';

export const Account: React.FC<AccountProps> = (props) => {
  const { item, textBeforeTitle } = props;

  const [t] = useTranslation('AccountSelector');

  const labelMap: Record<Fund, string> = {
    usdt_wallet: t('usdtWallet'),
    usdt: t('usdtSaving'),
    btc_wallet: t('btcWallet'),
    btc: t('btcSaving'),
    eth_wallet: t('ethWallet'),
    eth: t('ethSaving'),
  };

  const iconMap: Record<Fund, 'usdt' | 'eth' | 'btc'> = {
    usdt_wallet: 'usdt',
    usdt: 'usdt',
    btc_wallet: 'btc',
    btc: 'btc',
    eth_wallet: 'eth',
    eth: 'eth',
  };

  const iconColorMap: Record<Fund, string> = {
    usdt_wallet: iconColors.usdt,
    usdt: iconColors.usdt,
    btc_wallet: iconColors.btc,
    btc: iconColors.btc,
    eth_wallet: iconColors.eth,
    eth: iconColors.eth,
  };

  const currency = fundToCurrency[item.fund];

  const balance = fix(item.balance.sum, { currency });
  return (
    <View style={s.box}>
      <CircleIcon icon={iconMap[item.fund]} color={iconColorMap[item.fund]} />
      <View style={s.content}>
        <Text style={s.label}>
          {textBeforeTitle} {labelMap[item.fund]}
        </Text>
        <Text style={s.amount}>
          {balance} {currency.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};
