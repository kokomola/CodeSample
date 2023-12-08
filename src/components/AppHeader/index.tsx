import { $isConnected } from '@store/app/connection';
import { useStore } from 'effector-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { styles as s } from './styles';

export function AppHeader() {
  const { t } = useTranslation('CommonInterface');

  const isConnected = useStore($isConnected);

  if (isConnected) {
    return null;
  }

  return (
    <View style={s.header}>
      <Text style={s.headerText}>{t('no_internet')}</Text>
    </View>
  );
}
