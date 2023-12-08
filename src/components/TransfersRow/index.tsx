import { ScreenTitle } from '@components/ScreenTitle';
import { Icon, IconName } from '@components/uikit/Icon';
import { useNavigation } from '@react-navigation/core';
import { initDefaultFundAndCoin } from '@store/default';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { routes } from 'src/navigator/routes';
import { TransferNamedRoutes } from 'src/navigator/TransferNavigator';

import { styles } from './styles';
import { useStore } from 'effector-react';
import { $isVerifiedAnd2fa } from '@store/user';
import { independence400, purple500 } from '@constants/colors';
const items: {
  icon: IconName;
  title: string;
  screen: string;
  needVerification: boolean;
}[] = [
  {
    icon: 'exchange',
    title: 'conversion',
    screen: TransferNamedRoutes.transfers.TransferConversion,
    needVerification: false,
  },
  {
    icon: 'amirFinance',
    title: 'toSaving',
    screen: TransferNamedRoutes.transfers.TransferToSaving,
    needVerification: true,
  },
  {
    icon: 'at',
    title: 'email',
    screen: TransferNamedRoutes.transfers.TransferByEmail,
    needVerification: false,
  },
  {
    icon: 'phone',
    title: 'phone',
    screen: TransferNamedRoutes.transfers.TransferByPhone,
    needVerification: false,
  },
];
export const TransfersRow: React.FC = () => {
  const [t] = useTranslation('TransferMenu');
  const { navigate } = useNavigation();
  const isVerifiedAnd2fa = useStore($isVerifiedAnd2fa);

  return (
    <>
      <ScreenTitle title={t('screenTitle')} />
      <ScrollView horizontal style={styles.sv}>
        {items.map(({ icon, title, screen, needVerification }, i) => {
          const getColor = (state: boolean) =>
            state ? independence400 : purple500;
          const isDisabled = needVerification && !isVerifiedAnd2fa;
          const backgroundColor = { backgroundColor: getColor(isDisabled) };
          const color = { color: getColor(isDisabled) };
          return (
            <TouchableOpacity
              style={[
                styles.card,
                i === 0 && styles.first,
                items.length > 0 && i === items.length - 1 && styles.last,
              ]}
              onPress={() => {
                initDefaultFundAndCoin();
                navigate(routes.tabs.Transfers, { screen });
              }}
              key={title}
              disabled={isDisabled}
            >
              <View style={[styles.icon, backgroundColor]}>
                <Icon color="white" icon={icon} />
              </View>
              <Text style={[styles.title, color]}>{t(title)}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
};
