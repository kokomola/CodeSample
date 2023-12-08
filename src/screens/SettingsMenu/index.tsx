import React from 'react';
import { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ScreenTitle } from '@components/ScreenTitle';
import { ListMenu } from '@components/uikit/ListMenu';
import { ReferralLinkModal } from '@components/ReferralLinkModal';
import { Button } from '@components/uikit';

import { logout } from '@store/logout';

import { SettingsMenuScreenProps } from './types';
import { styles as s } from './styles';
import { routes } from 'src/navigator/routes';

export const SettingsMenu: React.FC<SettingsMenuScreenProps> = (props) => {
  const { navigation } = props;

  const [t] = useTranslation('SettingsMenu');

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={s.sav}>
      <ScreenTitle title={t('screenTitle')} />

      <View style={s.box}>
        <Button
          customStyle={s.parnterLink}
          text={t('partnerLink')}
          onPress={() => setModalVisible(true)}
        />
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
              onPress: () =>
                navigation.navigate(routes.profileTab.changePassword),
            },
            {
              key: 'at',
              icon: 'at',
              text: t('changeEmailButtonText'),
              onPress: () => navigation.navigate(routes.profileTab.changeEmail),
            },
            {
              key: 'logout',
              icon: 'logout',
              text: t('logoutButtonText'),
              onPress: () => logout(),
            },
          ]}
        />
      </View>
      <ReferralLinkModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};
