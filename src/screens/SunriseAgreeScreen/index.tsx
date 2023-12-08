import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ScreenTitle } from '@components/ScreenTitle';
import { Button } from '@components/uikit';
import { showSunriseAgree } from '@store/sunrise/agreement';
import { styles as s } from './styles';

export const SunriseAgreeScreen = () => {
  const [t] = useTranslation('SunriseDomain');
  return (
    <SafeAreaView style={s.sav}>
      <ScreenTitle title="Sunrise" back />
      <View style={s.box}>
        <Text>{t('didAgree')}</Text>
        <Button
          text={t('showAgree')}
          onPress={() => showSunriseAgree()}
          type="ghost"
        />
      </View>
    </SafeAreaView>
  );
};
