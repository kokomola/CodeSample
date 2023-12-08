import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { BackButton } from '@components/layout/BackButton';
import { ListMenu } from '@components/uikit/ListMenu';

import { styles as s } from './styles';

export const LanguageSettings: React.FC = () => {
  const { t, i18n } = useTranslation('LanguageSettings');

  const RU = 'ru-RU';
  const EN = 'en-GB';
  const TR = 'tr';

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('backButtonText')} />

      <View style={s.box}>
        <ListMenu
          menu={[
            {
              key: 'Русский',
              text: 'Русский',
              onPress: () => {
                i18n.changeLanguage(RU);
              },
              active: i18n.language === RU,
            },
            {
              key: 'English',
              text: 'English',
              onPress: () => {
                i18n.changeLanguage(EN);
              },
              active: i18n.language === EN,
            },
            {
              key: TR,
              text: 'Türk',
              onPress: () => {
                i18n.changeLanguage(TR);
              },
              active: i18n.language === TR,
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};
