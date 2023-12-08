import * as React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useStore, useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';

import {
  ActionsPanelBox,
  BalanceBox,
  DetailsBox,
  NoTxsMock,
  TxsBox,
} from '@components/AccountLayout';
import { AccountTitle } from '@components/AccountTitle';
import { Button } from '@components/uikit/Button';
import { BackButton } from '@components/layout/BackButton';
import { AccountDetailsRow } from '@components/AccountDetailsRow';
import { TxHistoryRow } from '@components/TxHistoryRow';
import { MaintenanceView } from '@components/MaintenanceView';

import {
  $purchasedTokens,
  $selectedTokenId,
  $sortedTokensOperations,
  fetchPurchasedTokensOperationsFx,
} from '@store/tokenSaleWallet';
import { $tokenSaleOffers } from '@store/tokenSale';
import {
  blurTokenSaleWalletScreen,
  focusTokenSaleWalletScreen,
} from '@store/app';

import { routes } from 'src/navigator/routes';
import { ActionsPanel } from '@components/uikit/ActionsPanel';
import { $fund } from '@store/account/fund';
import {
  updateAvailableTransfers,
  updateSelectedTokenSaleId,
} from '@store/transfer';
import { navigate } from 'src/navigator/RootNavigation';
import { Loading } from '@components/uikit/Loading';
import { IScreenProps } from 'src/common/types';
import { styles as s } from './styles';
import { $selectedCoin } from '@store/coin-network';
import { Coin } from '@store/coin-network/types';
import { $addresses } from '@store/deposit';
import { Sign } from '@constants/funds';
import { $isVerifiedAnd2fa } from '@store/user';

export const TokenSaleWallet: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;

  const [t] = useTranslation('TokenSaleWallet');
  const [tCryptoWallet] = useTranslation('CryptoWallet');

  const fund = useStore($fund);
  const id = useStore($selectedTokenId);
  const coin = useStore($selectedCoin);
  const tokenWallet = useStoreMap({
    store: $purchasedTokens,
    keys: [id],
    fn: (offer, [f]) => offer.find((o) => o.token.id === f) || null,
  });

  React.useEffect(
    () => navigation.addListener('focus', () => focusTokenSaleWalletScreen()),
    [navigation]
  );
  React.useEffect(
    () => navigation.addListener('blur', () => blurTokenSaleWalletScreen()),
    [navigation]
  );

  const isLoading = useStore(fetchPurchasedTokensOperationsFx.pending);
  const operations = useStore($sortedTokensOperations);
  const addresses = useStore($addresses);
  const pairs = addresses.filter((pair) => pair.coin === coin);
  const isVerifiedAnd2fa = useStore($isVerifiedAnd2fa);

  // there is no "isOwner"/"isBuyable" property in $purchasedTokens:
  const tokenSaleOffers = useStore($tokenSaleOffers);
  const token = tokenSaleOffers.find((o) => o.id === id);
  const isOwner = token?.isOwner;
  const isBuyable = isVerifiedAnd2fa && token?.isBuyable;

  const commands = token?.meta.availableOperations || [];
  const canDeposit = coin === Coin.AWT && commands.includes('input');
  const canWithdraw = false; // TODO commands.includes('withdraw');
  const canTransfer = commands.includes('transfer');

  if (tokenWallet === null) return <MaintenanceView />;

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={tokenWallet.token.code} />
      <ScrollView>
        <BalanceBox>
          <AccountTitle
            imageURI={tokenWallet.token.image}
            iconColor="plain"
            title={`${tokenWallet.balance} ${tokenWallet.token.code}`}
          />
        </BalanceBox>

        {(canDeposit || canWithdraw || canTransfer) && (
          <ActionsPanelBox>
            <ActionsPanel
              actions={[
                {
                  icon: 'plus',
                  onPress: () =>
                    navigate(routes.tabs.Transfers, {
                      screen: routes.transfers.Deposit,
                      params: { fund },
                    }),
                  label: tCryptoWallet('replenishButton'),
                  disabled: !canDeposit || !isVerifiedAnd2fa,
                },
                {
                  icon: 'exchange',
                  onPress: () => {
                    updateAvailableTransfers([
                      routes.transfers.TransferByEmail,
                      routes.transfers.TransferByPhone,
                    ]);
                    if (token) updateSelectedTokenSaleId(token.id);
                    navigate(routes.tabs.Transfers, {
                      screen: routes.transfers.TransferMenu,
                    });
                  },
                  label: tCryptoWallet('transferButton'),
                  disabled: !canTransfer || !isVerifiedAnd2fa,
                },
                {
                  icon: 'chevronDoubleRight',
                  onPress: () => {
                    navigate(routes.tabs.Transfers, {
                      screen: routes.transfers.Withdraw,
                      params: { fund },
                    });
                  },
                  label: tCryptoWallet('withdrawButton'),
                  disabled: !canWithdraw || !isVerifiedAnd2fa,
                },
              ]}
            />
          </ActionsPanelBox>
        )}

        {isBuyable && (
          <Button
            customStyle={s.margin}
            text={`${t('buyToken')} ${tokenWallet.token.code}`}
            onPress={() =>
              navigation.navigate(routes.tokenSaleNav.TokenSaleBuy, {
                id: id,
              })
            }
          />
        )}

        {isOwner && (
          <Button
            customStyle={s.margin}
            text={`${t('editToken')} ${tokenWallet.token.code}`}
            onPress={() =>
              navigation.navigate(routes.tokenSaleNav.TokenSaleEdit, { id })
            }
          />
        )}

        <DetailsBox title={t('info')}>
          <AccountDetailsRow
            value={`${tokenWallet.token.price}`}
            label={`${t('equivalentInUSDT')}`}
          />
          {isVerifiedAnd2fa &&
            pairs.map((pair) => (
              <AccountDetailsRow
                key={pair.address}
                label={`${t('walletDetailAddress')} ${Sign[pair.network]}`}
                value={pair.address}
                hasCopyOnPress
              />
            ))}
        </DetailsBox>

        <TxsBox title={t('transactionHistory')}>
          {isLoading && <Loading size="small" />}

          {!isLoading && operations.length === 0 ? <NoTxsMock /> : null}

          {!isLoading &&
            operations.map((tx, index) => {
              const isGot = Number(tx.amount) > 0;
              const meta = tx?.meta;
              const fromEmail = meta?.fromEmail
                ? t('from') + meta?.fromEmail
                : '';
              const toEmail = meta?.toEmail ? t('to') + meta?.toEmail : '';
              const message = meta?.message ? t('message') + meta?.message : '';
              return (
                <View key={`item-${index}`}>
                  <TxHistoryRow
                    tx={{
                      type: tx.type,
                      createdAt: tx.createdAt,
                      amountToken: tx.amount,
                      text: isGot
                        ? `${fromEmail} ${message}`
                        : `${toEmail} ${message}`,
                    }}
                    customTokenFund={`${tokenWallet.token.code}`}
                  />
                </View>
              );
            })}
        </TxsBox>
      </ScrollView>
    </SafeAreaView>
  );
};
