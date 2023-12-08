import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { BalanceBox, NoTxsMock, TxsBox } from '@components/AccountLayout';
import { AccountTitle } from '@components/AccountTitle';
import { Button } from '@components/uikit/Button';

import { SollarWalletScreenProps } from './types';
import { styles as s } from './styles';
import { BackButton } from '@components/layout/BackButton';
import { TxHistoryRow } from '@components/TxHistoryRow';
import {
  $sollarBalance,
  $sollarTxs,
  fetchSollarRequestFx,
} from '@store/sollars';
import { SollarIncome } from '@store/sollars/types';

import { fix } from '@utils/numbers/fix';
import {
  blurSollarWalletScreen,
  focusSollarWalletScreen,
  redirectToShopNavFx,
} from '@store/app';
import { $sunriseProgramData } from '@store/sunrise';
import { routes } from 'src/navigator/routes';
import { SgcIcon } from '@components/uikit/Icon/lib';

export const SollarWallet: React.FC<SollarWalletScreenProps> = (props) => {
  const { navigation } = props;

  const [t] = useTranslation('SollarWallet');

  const balance = useStore($sollarBalance);
  const txs = useStore($sollarTxs);

  const isLoading = useStore(fetchSollarRequestFx.pending);

  React.useEffect(
    () => navigation.addListener('focus', () => focusSollarWalletScreen()),
    [navigation]
  );

  React.useEffect(
    () => navigation.addListener('blur', () => blurSollarWalletScreen()),
    [navigation]
  );

  const { sollarNav, shopNav } = routes;
  const { programType } = useStore($sunriseProgramData);

  return (
    <SafeAreaView style={s.sav}>
      <ScrollView>
        <BackButton text="Sollar Gift Coin" />
        <View style={s.box}>
          <BalanceBox>
            <AccountTitle
              SvgIcon={SgcIcon}
              iconColor="sol"
              title={`${fix(String(balance), { currency: 'sol' })} SGC`}
            />
          </BalanceBox>
          <View style={s.offsetButtons}>
            <Button
              text={t('buySollarButton')}
              onPress={() => navigation.navigate(sollarNav.SollarWalletBuy)}
              icon="plus"
              customStyle={s.offsetBetweenButton}
            />
            <Button
              type="secondary"
              text={t('goToSollarGifts')}
              onPress={() => redirectToShopNavFx({ screen: shopNav.ShopList })}
              icon="gift"
              customStyle={s.offsetBetweenButton}
            />
            {programType === 'default' ? (
              <Button
                type="secondary"
                text={t('default')}
                onPress={() =>
                  navigation.navigate(routes.tabs.Sunrise, {
                    screen: routes.sunriseTab.loyaltyLanding,
                  })
                }
                icon="warning"
                customStyle={s.offsetBetweenButton}
              />
            ) : null}
          </View>
          <TxsBox title={t('transactionHistory')}>
            {!isLoading && txs.length === 0 ? <NoTxsMock /> : null}
            {txs.slice(0, 10).map((tx: SollarIncome) => (
              <View key={`item-${tx.id}`}>
                <TxHistoryRow tx={{ ...tx, fund: 'sgc' }} />
                <View style={s.divider} />
              </View>
            ))}
            {txs.length > 10 && (
              <Button
                type="ghost"
                text={t('showAllHistoryButton')}
                onPress={() =>
                  navigation.navigate(sollarNav.SollarWalletTxHistory)
                }
              />
            )}
          </TxsBox>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
