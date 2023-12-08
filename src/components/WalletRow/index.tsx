import React from 'react';
import { useStore } from 'effector-react';

import { Currency, mapFundToCurrency, Fund, isSavings } from '@constants/funds';
import { percentageBalance } from '@constants/stable';
import { useNavigation } from '@react-navigation/native';
import { selectFund } from '@store/account/fund';
import { $courses } from '@store/user';
import { $isAccountsLoaded } from '@store/wallets';
import { convert } from '@utils/numbers/converters';
import { fix } from '@utils/numbers/fix';
import { useWalletByFund } from 'src/hooks/useWalletByFund';
import { TouchableRow } from '@components/TouchableRow';
import * as colors from '@constants/colors';
import { selectCoin } from '@store/coin-network';
import { Coin } from '@store/coin-network/types';
import { showSavingsAccountAlert } from '@store/savingsAccount/alert';
import { $settings } from '@store/settings';

interface IWalletProps {
  fund: Fund;
  route: string;
  percent?: boolean;
  coin?: Coin;
  isBlocked?: boolean;
}

export const WalletRow: React.FC<IWalletProps> = ({
  fund,
  route,
  percent: isPercent,
  coin,
  isBlocked,
}) => {
  const navigation = useNavigation();
  const wallet = useWalletByFund(fund);

  const courses = useStore($courses);
  const isAccountsLoaded = useStore($isAccountsLoaded);
  const settings = useStore($settings);

  if (!wallet) return null;

  const currency = mapFundToCurrency[fund] as Currency;
  const rate = settings[`interest_accrual_on_${currency}_wallet`];
  const balance = fix(wallet!.balance.sum, { currency });
  const balanceInUSDT = fix(
    convert({
      amount: wallet!.balance.sum,
      from: currency,
      to: Currency.USDT,
      courses,
    }),
    { currency: Currency.USDT },
  );
  const currencySign = currency.toUpperCase();
  const primaryText = `${balance} ${currencySign}`;
  const smallText = `${balanceInUSDT} USDT`;
  const percent = isPercent && rate ? +(rate * 100).toFixed(3) : undefined;
  const color = isBlocked ? 'blocked' : currency;
  const fnInfo =
    isSavings(fund) && isBlocked ? showSavingsAccountAlert : undefined;

  return (
    <TouchableRow
      loading={!isAccountsLoaded}
      onPress={() => {
        selectFund(fund);
        if (coin) selectCoin(coin);
        navigation.navigate(route, { fund });
      }}
      percent={percent}
      primaryText={primaryText}
      smallText={smallText}
      icon={currency}
      iconColor={colors.iconColors[color]}
      fnInfo={fnInfo}
    />
  );
};
