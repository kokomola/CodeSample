/* eslint-disable camelcase */
import * as React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { CoinProps } from './types';
import { fix } from '@utils/numbers/fix';
import { AFastImage } from '@components/AFastImage';
import { styles as s } from './styles';
import { Currency, mapFundToCurrency, Sign } from '@constants/funds';
import { Coin as TCoin, isCoin } from '@store/coin-network/types';

export const Coin: React.FC<CoinProps> = ({ item }) => {
  const [t] = useTranslation('UI');

  const fund = item?.fund;
  const currency = fund ? mapFundToCurrency[fund] : Currency.USDT;
  const balance = fix(item.balance, { currency });
  const SvgIcon = item?.SvgIcon;
  const uri = item?.uri;
  const coin = item.coin;

  const sign = isCoin(coin) ? Sign[coin as TCoin] : coin;

  return (
    <View style={s.box}>
      {SvgIcon && <SvgIcon width={44} height={44} fill={item.color} />}
      {uri && <AFastImage style={s.image} uri={uri} />}
      <View style={s.content}>
        <Text style={s.label}>
          {t(item.textBeforeTitle)} {t(item.translate)}
        </Text>
        <Text style={s.amount}>
          {balance} {sign}
        </Text>
      </View>
    </View>
  );
};
