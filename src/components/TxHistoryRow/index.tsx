import * as React from 'react';
import { View, Text } from 'react-native';
import { format } from 'date-fns';

import * as colors from '@constants/colors';
import { operationTypes } from '@constants/operationTypes';
import { fix } from '@utils/numbers/fix';
import { fundToCurrency, fundToTicker } from '@utils/maps';
import { CircleIcon } from '@components/uikit/Icon';

import { styles as s } from './styles';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { log, logline } from '@utils/debug';

export type Tx = {
  amount: string | BigNumber;
  createdAt: string | Date;
  type: string;
  id: string;
  fund:
    | 'btc_wallet'
    | 'eth_wallet'
    | 'usdt_wallet'
    | 'btc'
    | 'eth'
    | 'usdt'
    | 'sgc';
  isTime?: boolean;
  amountToken: string | BigNumber | number;
  text?: string;
};

type Props = {
  tx: Tx;
  customTokenFund?: string;
};

export const TxHistoryRow: React.FC<Props> = (props) => {
  const { tx, customTokenFund } = props;

  const [t] = useTranslation('operationTypes');

  const txType = operationTypes[tx.type];
  const color = txType?.color || colors.space900;
  const label = txType?.label ? t(txType.label) : tx.type;
  const icon = txType?.icon || 'plus';
  //const Icon = txType?.icon as React.ElementType;
  const currency = fundToCurrency[tx.fund] || customTokenFund;
  const ticker = fundToTicker[tx.fund] || customTokenFund || 'SGC'; // We dont have fund in sol tx
  const amount = `${fix(tx.amount, { currency })} ${ticker}`;
  const amountToken = `${tx.amountToken} ${ticker}`;

  const createdAt = new Date(tx.createdAt);
  const time = !tx.isTime ? ` / ${format(createdAt, 'HH:mm')}` : '';
  const date = format(tx.createdAt, 'DD.MM.YY') + time || '';
  const text = tx?.text;

  return (
    <View style={s.box}>
      <View style={s.iconBox}>
        {typeof icon === 'string' ? (
          <CircleIcon icon={icon} color={color} />
        ) : null}
      </View>

      <View style={s.infoBox}>
        {!!tx?.amount && <Text style={s.amountText}>{amount}</Text>}
        {!!tx?.amountToken && <Text style={s.amountText}>{amountToken}</Text>}
        <Text style={s.typeText}>{label}</Text>
        {!!text && <Text style={s.typeText}>{text}</Text>}
      </View>

      <View style={s.dateBox}>
        <Text style={s.dateText}>{date}</Text>
      </View>
    </View>
  );
};
