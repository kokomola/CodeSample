import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
  SafeAreaView,
  View,
  Text,
  Linking,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import { amirWalletLogo } from './img/amirWalletLogo';
import { BackButton } from '@components/layout/BackButton';
import { Icon } from '@components/uikit/Icon';

import { getVersion } from 'react-native-device-info';

import { documentationLinksMap } from '@utils/maps';

import { styles as s } from './styles';

export const AboutApp: React.FC = () => {
  const [t] = useTranslation('SettingsMenu');

  const appVersion = getVersion();

  const handlePress = React.useCallback(
    async (url: string) => {
      const supported = await Linking.canOpenURL(url);

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
      <BackButton text={t('backButtonText')} />

      <View style={s.logoContainer}>
        <SvgXml xml={amirWalletLogo} />
        <Text style={s.smallText}>{`v ${appVersion}`}</Text>
      </View>

      <View style={s.listBox}>
        <FlatList
          data={documentationLinksMap(t)}
          keyExtractor={(item) => item.name}
          renderItem={(linkData) => (
            <TouchableOpacity onPress={() => handlePress(linkData.item.link)}>
              <View style={s.linkContainer}>
                <Icon icon="file" />
                <Text style={s.listItemText}>{linkData.item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={s.separator} />}
          ListFooterComponent={() => <View style={s.separator} />}
          contentContainerStyle={s.contentContainer}
        />
      </View>
    </SafeAreaView>
  );
};
