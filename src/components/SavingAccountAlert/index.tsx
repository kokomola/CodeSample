import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { styles as s } from './styles';
import { InfoIcon } from '@components/uikit/Icon/lib';

export function SavingAccountAlert() {
  const [t] = useTranslation('Accounts');
  return (
    <View style={s.box}>
      <InfoIcon />
      <Text style={s.text}>{t('blockedSavingsAccountsInfo')}</Text>
    </View>
  );
}
