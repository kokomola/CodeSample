import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { navigate } from 'src/navigator/RootNavigation';
import {
  BalanceBox,
  ActionsPanelBox,
  DetailsBox,
  TxsBox,
  NoTxsMock,
} from '@components/AccountLayout';
import { AccountTitle } from '@components/AccountTitle';
import { AccountDetailsRow } from '@components/AccountDetailsRow';
import { TxHistoryRow } from '@components/TxHistoryRow';
import { ActionsPanel } from '@components/uikit/ActionsPanel';
import { Button } from '@components/uikit/Button';
import { BackButton } from '@components/layout/BackButton';

import { $walletByFund } from '@store/wallets';
import { $courses, $userHasSecurityAlert } from '@store/user';

import { fix, fixToUsdt } from '@utils/numbers/fix';
import { convert } from '@utils/numbers/converters';

import { $addresses, $selectedAddress } from '@store/deposit';
import { $incomes, fetchOperationFx } from '@store/account/income';

import { IScreenProps } from 'src/common/types';
import { styles as s } from './styles';
import { MAX_LIMIT_ROWS } from '@constants/endpoints';
import { Loading } from '@components/uikit/Loading';
import { $fund } from '@store/account/fund';
import { routes } from 'src/navigator/routes';
import { mapBalancePercent, mapFundToCurrency, Sign } from '@constants/funds';
import { fullNameByCoin, fundToCoin } from '@store/coin-network/types';
import { focusCryptoWalletScreen } from '@store/app';
import { $settings } from '@store/settings';

export const CryptoWallet: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;

  const [t] = useTranslation('CryptoWallet');

  const fund = useStore($fund);
  const wallet = useStore($walletByFund);
  const incomes = useStore($incomes);
  const courses = useStore($courses);
  const isOpsRestricted = useStore($userHasSecurityAlert);
  const isLoading = useStore(fetchOperationFx.pending);
  const addresses = useStore($addresses);
  const selectedAddress = useStore($selectedAddress);

  React.useEffect(
    () => navigation.addListener('focus', () => focusCryptoWalletScreen()),
    [navigation],
  );

  if (!wallet || !fund) return null;

  const { transfers } = routes;

  const currency = mapFundToCurrency[fund];
  const coin = fundToCoin[fund];
  const settings = useStore($settings);

  const pairs = addresses.filter((pair) => pair.coin === coin);
  const USDTEquivalentRaw = convert({
    amount: wallet.balance.sum,
    from: currency,
    to: 'usdt',
    courses,
  });
  const USDTEquivalent = fixToUsdt(USDTEquivalentRaw);
  const rate = settings[`interest_accrual_on_${currency}_wallet`];

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={fullNameByCoin[coin]} />

      <ScrollView>
        <BalanceBox>
          <AccountTitle
            icon={currency}
            iconColor={currency}
            title={`${fix(wallet.balance.sum, { currency })} ${Sign[currency]}`}
          />
        </BalanceBox>

        <ActionsPanelBox>
          <ActionsPanel
            actions={[
              {
                icon: 'plus',
                onPress: () =>
                  navigate(routes.tabs.Transfers, {
                    screen: transfers.Deposit,
                    params: { fund },
                  }),
                label: t('replenishButton'),
                disabled: !selectedAddress,
              },
              {
                icon: 'exchange',
                onPress: () =>
                  navigate(routes.tabs.Transfers, {
                    screen: transfers.TransferMenu,
                  }),
                label: t('transferButton'),
                disabled: isOpsRestricted,
              },
              {
                icon: 'chevronDoubleRight',
                onPress: () => {
                  navigate(routes.tabs.Transfers, {
                    screen: transfers.Withdraw,
                    params: { fund },
                  });
                },
                label: t('withdrawButton'),
                disabled: isOpsRestricted,
              },
            ]}
          />
        </ActionsPanelBox>

        <DetailsBox title={t('accountDetailsSectionTitle')}>
          {pairs.map((pair) => (
            <AccountDetailsRow
              key={pair.address}
              label={`${t('walletDetailAddress')} ${Sign[pair.network]}`}
              value={pair.address}
              hasCopyOnPress
            />
          ))}

          <AccountDetailsRow
            label={t('walletDetailUSDTEquivalent')}
            value={`${USDTEquivalent} ${Sign.usdt}`}
          />

          <AccountDetailsRow
            label={t('annualProfit')}
            value={+(rate * 100).toFixed(3) + '%'}
          />
        </DetailsBox>

        <TxsBox title={t('txHistorySectionTitle')}>
          {isLoading && <Loading size="small" />}

          {!isLoading && incomes.length === 0 ? <NoTxsMock /> : null}

          {!isLoading &&
            incomes
              .slice(0, 10)
              .map((income) => <TxHistoryRow key={income.id} tx={income} />)}

          {!isLoading && incomes.length > 10 && (
            <Button
              type="ghost"
              text={t('showAllHistoryButton')}
              onPress={() => {
                fetchOperationFx({ fund, limit: MAX_LIMIT_ROWS, offset: 0 });
                navigation.navigate(routes.amirWallet.CryptoWalletTxHistory);
              }}
            />
          )}
        </TxsBox>
      </ScrollView>
    </SafeAreaView>
  );
};
