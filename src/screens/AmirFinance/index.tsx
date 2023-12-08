import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from 'effector-react';

import { RequestHistoryRow } from '@components/RequestHistoryRow';
import { TouchableRow } from '@components/TouchableRow';
import { Button } from '@components/uikit';
import { independence500, purple500 } from '@constants/colors';
import { $requests } from '@store/requests';
import { $openedStableAccounts } from '@store/stables';
import { Cryptocurrencies } from '@store/stables/types';
import { $isVerifiedAnd2fa, $userHasSecurityAlert } from '@store/user';
import { fix } from '@utils/numbers/fix';
import { styles as s } from './styles';
import { ScreenTitle } from '@components/ScreenTitle';
import { Icon } from '@components/uikit/Icon';
import { SunriseLevel } from '@components/SunriseLevel';
import { Courses } from '@components/Courses';
import { Header } from '@components/Header';
import { routes } from 'src/navigator/routes';
import { IScreenProps } from 'src/common/types';
import { focusAmirFinanceScreen } from '@store/app';
import { WalletRow } from '@components/WalletRow';
import { Fund } from '@constants/funds';
import { BannerRow } from '@components/BannerRow';
import { $isBlockedSavingAccount } from '@store/account/permissions';
import { Coin } from '@store/coin-network/types';

export const AmirFinance: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;
  const [t] = useTranslation('Accounts');
  const isOpsRestricted = useStore($userHasSecurityAlert);
  const openedStableAccounts = useStore($openedStableAccounts);
  const requests = useStore($requests);
  const isBlocked = useStore($isBlockedSavingAccount);
  const isVerifiedAnd2fa = useStore($isVerifiedAnd2fa);

  React.useEffect(
    () => navigation.addListener('focus', () => focusAmirFinanceScreen()),
    [navigation]
  );

  const isRequests = !!requests && requests?.length > 0;
  const { amirFinance } = routes;
  const route = amirFinance.Saving;

  return (
    <SafeAreaView style={s.sav}>
      <Header />
      <ScrollView style={s.sv}>
        <Text style={s.sectionTitle}>{t('savingsSectionTitle')}</Text>
        <View style={s.section}>
          <WalletRow
            fund={Fund.BtcSaving}
            isBlocked={isBlocked}
            route={route}
            coin={Coin.BTC}
          />
          <WalletRow
            fund={Fund.EthSaving}
            isBlocked={isBlocked}
            route={route}
            coin={Coin.ETH}
          />
          <WalletRow
            fund={Fund.UsdtSaving}
            isBlocked={isBlocked}
            route={route}
            coin={Coin.USDT}
          />
        </View>
        {isRequests && (
          <Text style={s.sectionTitle}>{t('requestQueueSectionTitle')}</Text>
        )}
        {isRequests && (
          <View style={s.section}>
            {requests.slice(0, 3).map((rqst) => (
              <RequestHistoryRow request={rqst} key={rqst.id} />
            ))}
          </View>
        )}
        {requests?.length > 3 && (
          <View style={s.rqstButton}>
            <Button
              text={t('allRequestQueueButton')}
              type="secondary"
              onPress={() => navigation.navigate(amirFinance.RequestHistory)}
              disabled={isOpsRestricted}
            />
          </View>
        )}
        <ScreenTitle
          title={t('stablesPlusSectionTitle')}
          buttons={
            <TouchableOpacity
              style={s.stablesPlusAllButton}
              onPress={() => navigation.navigate(amirFinance.StableAllAccounts)}
              disabled={isOpsRestricted}
            >
              <Text style={s.stablesPlusAllButtonText}>
                {t('allStablesPlusButton')}
              </Text>
              <Icon icon="chevronRight" color={purple500} />
            </TouchableOpacity>
          }
        />
        <View style={s.section}>
          {openedStableAccounts.slice(0, 3).map((stable) => (
            <TouchableRow
              key={stable.id}
              disabled={isOpsRestricted}
              onPress={() =>
                navigation.navigate(amirFinance.Stable, {
                  id: stable.id,
                })
              }
              primaryText={`${fix(stable.amount, {
                currency: stable.currency || 'usdt',
              })} ${Cryptocurrencies[stable.currency || 'usdt']}`}
              smallText={stable.title || `Stable #${stable.id}`}
              icon="flare"
              iconColor={independence500}
            />
          ))}
        </View>
        <View style={s.buttons}>
          <Button
            text={t('createNewStablePlusButton')}
            onPress={() => navigation.navigate(amirFinance.StableCreate)}
            disabled={!isVerifiedAnd2fa}
          />
        </View>
        <View style={s.section}>
          <Text style={s.sectionTitle}>{t('sunriseProgram')}</Text>
          <SunriseLevel />
        </View>
        <View style={s.section}>
          <BannerRow navigation={navigation} />
        </View>
        <View style={[s.section, s.coursesSecion]}>
          <Courses />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
