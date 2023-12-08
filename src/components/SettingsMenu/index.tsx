import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { ListMenu } from '@components/uikit/ListMenu';
import { routes } from 'src/navigator/routes';
import { askDelete } from '@store/account/delete';

export const SettingsMenu: React.FC = () => {
  const navigation = useNavigation();

  const [t] = useTranslation('SettingsMenu');

  return (
    <ListMenu
      menu={[
        {
          key: 'language',
          icon: 'language',
          text: t('languageButtonText'),
          onPress: () =>
            navigation.navigate(routes.profileTab.languageSettings),
        },
        {
          key: 'user',
          icon: 'user',
          text: t('kycButtonText'),
          onPress: () => navigation.navigate(routes.profileTab.kycScreen),
        },
        {
          key: 'shield',
          icon: 'shield',
          text: t('2faButtonText'),
          onPress: () =>
            navigation.navigate(routes.profileTab.twoFactorAuthSettings),
        },
        {
          key: 'percent',
          icon: 'percent',
          text: t('reinvestmentButtonText'),
          onPress: () =>
            navigation.navigate(routes.profileTab.reinvestmentSettings),
        },
        {
          key: 'lockOpen',
          icon: 'lockOpen',
          text: t('changePasswordButtonText'),
          onPress: () => navigation.navigate(routes.profileTab.changePassword),
        },
        {
          key: 'at',
          icon: 'at',
          text: t('changeEmailButtonText'),
          onPress: () => navigation.navigate(routes.profileTab.changeEmail),
        },
        {
          key: 'deletedAt',
          icon: 'deleteAccount',
          text: t('deleteAccount'),
          onPress: () => askDelete(),
        },
      ]}
    />
  );
};
