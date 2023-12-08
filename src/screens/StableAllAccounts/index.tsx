import React from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { Text } from 'react-native';

import { SafeAreaView, View } from 'react-native';
import Layout from '@components/common/Layout';
import { BackButton } from '@components/layout/BackButton';
import { Button } from '@components/uikit/Button';
import { TouchableRow } from '@components/TouchableRow';

import { fix } from '@utils/numbers/fix';

import {
  $legacyStables,
  $openedStableAccounts,
  $openedLegacyAccounts,
  $closedStableAccounts,
} from '@store/stables';

import { s } from './styles';
import { independence500 } from '@constants/colors';
import { Cryptocurrencies } from '@store/stables/types';
import { IScreenProps } from 'src/common/types';
import { routes } from 'src/navigator/routes';

export const StableAllAccounts: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;
  const openedStableAccounts = useStore($openedStableAccounts);
  const closedStableAccounts = useStore($closedStableAccounts);

  const legacyStables = useStore($legacyStables);

  const openedLegacyAccounts = useStore($openedLegacyAccounts);

  const { t } = useTranslation('StablesAllAccounts');

  return (
    <SafeAreaView style={s.box}>
      <BackButton text={t('appTopbarTitle')} />

      <Layout.Wrapper>
        {openedLegacyAccounts.map((legacy) => (
          <View style={s.itemsBox} key={`${legacy.id}${legacy?.amount}`}>
            <TouchableRow
              onPress={() => null}
              primaryText={`${fix(legacy.amount, {
                currency: legacy.currency || 'usdt',
              })} ${Cryptocurrencies[legacy.currency] || 'USDT'}`}
              smallText={legacy.title || `Legacy Stable #${legacy.id}`}
              icon="lock"
              iconColor={independence500}
              bottomBorder={true}
            />
          </View>
        ))}

        {openedStableAccounts.map((stable) => (
          <View style={s.itemsBox} key={`${stable.id}${stable.amount}`}>
            <TouchableRow
              onPress={() =>
                navigation.navigate(routes.amirFinance.Stable, {
                  id: stable.id,
                })
              }
              primaryText={`${fix(stable.amount, {
                currency: stable.currency,
              })} ${Cryptocurrencies[stable.currency] || 'USDT'}`}
              smallText={stable.title || `Stable #${stable.id}`}
              icon="flare"
              iconColor={independence500}
              bottomBorder={true}
            />
          </View>
        ))}

        {legacyStables.length > 0 && (
          <View style={s.legacyHintBox}>
            <Text style={s.legacyHintText}>{t('legacyHint')}</Text>
          </View>
        )}

        <Layout.Section>
          {closedStableAccounts.length > 0 && (
            <View style={s.btnBox}>
              <Button
                type="secondary"
                text={t('allClosedAccounts')}
                onPress={() =>
                  navigation.navigate(
                    routes.amirFinance.StableAllClosedAccounts
                  )
                }
              />
            </View>
          )}
        </Layout.Section>
      </Layout.Wrapper>
    </SafeAreaView>
  );
};
