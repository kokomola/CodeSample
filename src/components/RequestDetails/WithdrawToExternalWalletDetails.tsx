import * as React from 'react';
import { Text, View } from 'react-native';
import { format } from 'date-fns';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { $openedRequest } from '@store/requests';

import { fix } from '@utils/numbers/fix';
import { fundToCurrency } from '@utils/maps';
import { styles as s } from './styles';

export const WithdrawToExternalWalletDetails: React.FC = () => {
  const { t } = useTranslation('RequestDetails');
  const request = useStore($openedRequest);

  if (!request) return null;

  const directions = {
    blockchain: `${request.target_address.slice(
      0,
      6
    )}...${request.target_address.slice(request.target_address.length - 6)}`,
    btc: t('btcSaving'),
    eth: t('ethSaving'),
    usdt: t('usdtSaving'),
    btc_wallet: t('btcWallet'),
    eth_wallet: t('ethWallet'),
    usdt_wallet: t('usdtWallet'),
  };

  const currency = fundToCurrency[request.spent_fund];
  const date = format(request.createdAt, 'DD.MM.YY / HH:mm');
  const id = request.id;
  const amount = `${fix(request.spent_amount, {
    currency,
  })} ${currency.toUpperCase()}`;
  const from = directions[request.spent_fund];
  const to = directions[request.target_type];

  return (
    <View>
      <View style={s.item}>
        <Text style={s.itemText}>{t('date')}</Text>
        <Text style={s.itemText}>{date}</Text>
      </View>

      <View style={s.item}>
        <Text style={s.itemText}>{t('id')}</Text>
        <Text style={s.itemText}>{id}</Text>
      </View>

      <View style={s.item}>
        <Text style={s.itemText}>{t('amount')}</Text>
        <Text style={s.itemText}>{amount}</Text>
      </View>

      <View style={s.item}>
        <Text style={s.itemText}>{t('from')}</Text>
        <Text style={s.itemText}>{from}</Text>
      </View>

      <View style={s.item}>
        <Text style={s.itemText}>{t('to')}</Text>
        <Text style={s.itemText}>{to}</Text>
      </View>
    </View>
  );
};
