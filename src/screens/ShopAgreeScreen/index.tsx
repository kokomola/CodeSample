import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, View } from 'react-native';

import { ScreenTitle } from '@components/ScreenTitle';
import { styles as s } from './styles';
import { Button } from '@components/uikit';
import { showShopAgree } from '@store/shop/agreement';

export const ShopAgreeScreen = () => {
  const [t] = useTranslation('ShopDomain');
  return (
    <SafeAreaView style={s.sav}>
      <View style={s.box}>
        <ScreenTitle title="Sollar Gifts" back />

        <Text>{t('didAgree')}</Text>
        <Button
          text={t('showAgree')}
          onPress={() => showShopAgree()}
          type="ghost"
        />
      </View>
    </SafeAreaView>
  );
};
