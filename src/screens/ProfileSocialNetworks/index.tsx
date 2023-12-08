import { ListMenu } from '@components/uikit/ListMenu';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking, SafeAreaView, View } from 'react-native';
import { styles as s } from './styles';
import {
  INSTAGRAM_CONTACT_EN,
  INSTAGRAM_CONTACT_RU,
  TELEGRAM_CONTACT_EN,
  TELEGRAM_CONTACT_RU,
  TWITTER_CONTACT,
  YOUTUBE_CONTACT,
  TIKTOK_CONTACT,
} from 'src/config';
import {
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
  TiktokIcon,
} from '@components/uikit/Icon/lib';
import { BackButton } from '@components/layout/BackButton';

export const ProfileSocialNetworks: FC = () => {
  const [t] = useTranslation('SettingsMenu');

  const handlePress = React.useCallback(
    async (url: string) => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      //logline('', { supported, url });

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`${t('unsupportedURL')} ${url}`);
      }
    },
    [t]
  );
  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('officialAccounts')} />
      <View style={s.box}>
        <ListMenu
          menu={[
            {
              key: 'youtube',
              svgIcon: YoutubeIcon,
              text: 'Youtube',
              onPress: () => handlePress(YOUTUBE_CONTACT),
            },
            {
              key: 'telegram',
              svgIcon: TelegramIcon,
              text: 'Telegram (en)',
              onPress: () => handlePress(TELEGRAM_CONTACT_EN),
            },
            {
              key: 'telegram',
              svgIcon: TelegramIcon,
              text: 'Telegram (ru)',
              onPress: () => handlePress(TELEGRAM_CONTACT_RU),
            },
            {
              key: 'instagram',
              svgIcon: InstagramIcon,
              text: 'Instagram (en)',
              onPress: () => handlePress(INSTAGRAM_CONTACT_EN),
            },
            {
              key: 'instagram',
              svgIcon: InstagramIcon,
              text: 'Instagram (ru)',
              onPress: () => handlePress(INSTAGRAM_CONTACT_RU),
            },
            {
              key: 'twitter',
              svgIcon: TwitterIcon,
              text: 'Twitter',
              onPress: () => handlePress(TWITTER_CONTACT),
            },
            {
              key: 'tiktok',
              svgIcon: TiktokIcon,
              text: 'TikTok',
              onPress: () => handlePress(TIKTOK_CONTACT),
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};
