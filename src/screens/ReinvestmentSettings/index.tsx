import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { BackButton } from '@components/layout/BackButton';

import ReinvestmentForm from '@components/settings/ReinvestmentForm';

import { styles as s } from './styles';

export const ReinvestmentSettings: React.FC = () => {
  const [t] = useTranslation('ReinvestmentSettings');

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('backButtonText')} />

      <ScrollView style={s.sv}>
        <View style={s.box}>
          <ReinvestmentForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
