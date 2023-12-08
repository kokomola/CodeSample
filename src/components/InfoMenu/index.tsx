import * as React from 'react';
import { Alert, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { getVersion } from 'react-native-device-info';

import { ListMenu } from '@components/uikit/ListMenu';

import i18n from '@utils/i18n';
import { routes } from 'src/navigator/routes';
import { FAQ_EN, FAQ_RU } from 'src/config';
import { IsDev } from '@utils/getEnv';

export const InfoMenu: React.FC = () => {
  const navigation = useNavigation();
  const [t] = useTranslation('SettingsMenu');

  const { profileTab } = routes;

  const appVersion = IsDev ? getVersion() : getVersion().substring(0, 6);

  const faqURL = i18n.language === 'ru-RU' ? FAQ_RU : FAQ_EN;

  const handlePress = React.useCallback(
    async (url: string) => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`${t('unsupportedURL')} ${url}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, faqURL]
  );

  return (
    <ListMenu
      menu={[
        {
          key: 'question',
          icon: 'question',
          text: t('faq'),
          onPress: () => handlePress(faqURL),
        },
        {
          key: 'warning',
          icon: 'warning',
          text: `${t('aboutApp')} (${appVersion})`,
          onPress: () => navigation.navigate(profileTab.aboutApp),
        },
        {
          key: 'shield',
          icon: 'thumbsUp',
          text: t('officialAccounts'),
          onPress: () => navigation.navigate(profileTab.socialNetworks),
        },
      ]}
    />
  );
};
