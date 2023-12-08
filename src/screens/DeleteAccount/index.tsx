import * as React from 'react';
import { Linking, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { BackButton } from '@components/layout/BackButton';
import { styles as s } from './styles';

import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';

export const DeleteAccount: React.FC = () => {
  const [t] = useTranslation('DeleteAccount');

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('backButtonText')} />

      <AKeyboardAvoidingView>
        <ScrollView style={s.sv}>
          <View style={s.box}>
            <Text style={s.m1}>
              {t('message_1_1')}
              <Text
                style={[s.m1, s.link]}
                onPress={() => Linking.openURL(t('message_1_link'))}
              >
                {t('message_1_email')}
              </Text>
              {t('message_1_2')}
            </Text>
            <Text style={s.m2}>{t('message_2')}</Text>
          </View>
        </ScrollView>
      </AKeyboardAvoidingView>
    </SafeAreaView>
  );
};
