import * as React from 'react';
import { Text, View } from 'react-native';
import { format } from 'date-fns';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@components/uikit/Button';

import {
  $canCancelTransaction,
  $openedRequest,
  pressCancelTransferRequest,
} from '@store/requests';

import { fundToCurrency } from '@utils/maps';
import { fix } from '@utils/numbers/fix';
import { styles as s } from './styles';

export const TransferFromSavingDetails: React.FC = () => {
  const { t } = useTranslation('RequestDetails');
  const request = useStore($openedRequest);
  const canCancelTransaction = useStore($canCancelTransaction);

  if (!request) return null;

  const directions = {
    blockchain: '-',
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

      {request.withdraw_transfer_group_date ? (
        <View style={s.item}>
          <Text style={s.itemText}>{t('approximateExecution')}</Text>
          <Text style={s.itemText}>
            {format(request.withdraw_transfer_group_date, 'DD.MM.YY')}
          </Text>
        </View>
      ) : null}

      {canCancelTransaction && (
        <Button
          kind="SheetButton"
          type={'secondary'}
          text={t('cancelButtonText')}
          onPress={() => pressCancelTransferRequest({ id })}
        />
      )}
    </View>
  );
};
