/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { BackButton } from '@components/layout/BackButton';
import { AccountTitle } from '@components/AccountTitle';
import { TxHistoryRow } from '@components/TxHistoryRow';
import { Button } from '@components/uikit';
import { AccountDetailsRow } from '@components/AccountDetailsRow';
import { ActionsPanel } from '@components/uikit/ActionsPanel';
import {
  ActionsPanelBox,
  BalanceBox,
  DetailsBox,
  NoTxsMock,
  TxsBox,
} from '@components/AccountLayout';

import { $savingByFund } from '@store/wallets';
import {
  $courses,
  $isVerifiedAnd2fa,
  $userHasSecurityAlert,
} from '@store/user';

import { fundToCurrency } from '@utils/maps';
import { fix } from '@utils/numbers/fix';
import { convert } from '@utils/numbers/converters';

import { $incomes, fetchOperationFx } from '@store/account/income';
import { Loading } from '@components/uikit/Loading';
import { MAX_LIMIT_ROWS } from '@constants/endpoints';
import { styles as s } from './styles';
import { IScreenProps } from 'src/common/types';
import { $fund } from '@store/account/fund';
import { TransferNamedRoutes } from 'src/navigator/TransferNavigator';
import { navigate } from 'src/navigator/RootNavigation';
import { routes } from 'src/navigator/routes';
import { focustSavingScreen } from '@store/app';

const backButtonText = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  usdt: 'Tether',
};

export const Saving: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;

  const [t] = useTranslation('Saving');

  const fund = useStore($fund);
  const incomes = useStore($incomes);
  const courses = useStore($courses);
  const saving = useStore($savingByFund);

  const isLoading = useStore(fetchOperationFx.pending);

  const isOpsRestricted = useStore($userHasSecurityAlert);
  const isVerifiedAnd2fa = useStore($isVerifiedAnd2fa);

  React.useEffect(() => {
    const unsubscrib = navigation.addListener('focus', () =>
      focustSavingScreen()
    );
    return unsubscrib;
  }, [navigation]);

  if (!saving || !fund) {
    return null;
  }

  const currency = fundToCurrency[fund];

  const USDTEquivalent = convert({
    amount: saving.balance.sum,
    from: currency,
    to: 'usdt',
    courses,
  });

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={backButtonText[fund]} />

      <ScrollView>
        <BalanceBox>
          <AccountTitle
            icon={currency}
            iconColor={currency}
            title={`${fix(saving.balance.sum, {
              currency: currency,
            })} ${currency.toUpperCase()}`}
          />
        </BalanceBox>

        <ActionsPanelBox>
          <ActionsPanel
            actions={[
              {
                icon: 'exchange',
                onPress: () =>
                  navigate(routes.tabs.Transfers, {
                    screen: routes.transfers.TransferMenu,
                  }),
                label: t('transferButton'),
                disabled: isOpsRestricted,
              },
              {
                icon: 'chevronDoubleRight',
                onPress: () =>
                  navigate(routes.tabs.Transfers, {
                    screen: routes.transfers.TransferFromSaving,
                  }),
                label: t('withdrawButton'),
                disabled: isOpsRestricted || isLoading || !isVerifiedAnd2fa,
              },
            ]}
          />
        </ActionsPanelBox>

        <DetailsBox title={t('accountDetailsSectionTitle')}>
          <AccountDetailsRow
            label={t('walletDetailUSDTEquivalent')}
            value={`${fix(USDTEquivalent, { currency: 'usdt' })} USDT`}
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
                navigation.navigate(routes.amirFinance.SavingTxHistory, {
                  fund,
                });
              }}
            />
          )}
        </TxsBox>
      </ScrollView>
    </SafeAreaView>
  );
};
