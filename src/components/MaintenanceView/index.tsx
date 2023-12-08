import React from 'react';
import { useTranslation } from 'react-i18next';

import { View, Text, SafeAreaView } from 'react-native';
import { BackButton } from '@components/layout/BackButton';
import { Icon } from '@components/uikit/Icon';

import { s } from './styles';

export const MaintenanceView: React.FC = () => {
  const { t } = useTranslation('MaintenanceView');

  return (
    <SafeAreaView style={s.container}>
      <BackButton />

      <View style={s.box}>
        <Icon icon={'history'} size="xl" />
        <Text style={s.text}>{t('sorry')}</Text>
      </View>
    </SafeAreaView>
  );
};
