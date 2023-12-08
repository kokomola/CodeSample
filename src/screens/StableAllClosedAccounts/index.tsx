import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import { View, SafeAreaView } from 'react-native';

import Layout from '../../components/common/Layout';
import { BackButton } from '@components/layout/BackButton';
import { TouchableRow } from '@components/TouchableRow';

import { $closedStableAccounts, $closedLegacyAccounts } from '@store/stables';
import { fix } from '@utils/numbers/fix';
import { s } from './styles';
import { independence500 } from '@constants/colors';
import { Cryptocurrencies } from '@store/stables/types';
import { IScreenProps } from 'src/common/types';
import { routes } from 'src/navigator/routes';

export const StableAllClosedAccounts: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;
  const closedStableAccounts = useStore($closedStableAccounts);

  const closedLegacyAccounts = useStore($closedLegacyAccounts);

  const { t } = useTranslation('StablesAllAccounts');

  return (
    <SafeAreaView>
      <BackButton text={t('allClosedAccounts')} />

      <Layout.Wrapper>
        {closedLegacyAccounts.map((legacy) => (
          <View style={s.itemsBox} key={`${legacy.id}${legacy.amount}`}>
            <TouchableRow
              onPress={() => null}
              primaryText={`${fix(legacy.amount, { currency: 'usdt' })} ${
                Cryptocurrencies[legacy.currency] || 'USDT'
              }`}
              smallText={legacy.title || `Legacy Stable #${legacy.id}`}
              icon="lock"
              iconColor={independence500}
              bottomBorder={true}
            />
          </View>
        ))}

        {closedStableAccounts.map((stable) => (
          <View style={s.itemsBox} key={`${stable.id}${stable.amount}`}>
            <TouchableRow
              onPress={() =>
                navigation.navigate(routes.amirFinance.Stable, {
                  id: stable.id,
                })
              }
              primaryText={`${fix(stable.amount, {
                currency: 'usdt',
              })} ${Cryptocurrencies[stable.currency] || 'USDT'}`}
              smallText={stable.title || `Stable #${stable.id}`}
              icon="flare"
              iconColor={independence500}
              bottomBorder={true}
            />
          </View>
        ))}
      </Layout.Wrapper>
    </SafeAreaView>
  );
};
