import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { BackButton } from '@components/layout/BackButton';
import { TFASettingsInitEnableStep } from '@components/TFASettingsInitEnableStep';
import { TFASettingsGoogleQRStep } from '@components/TFASettingsGoogleQRStep';
import { TFASettingsGoogleCodeStep } from '@components/TFASettingsGoogleCodeStep';
import { TFASettingsSmsPhoneStep } from '@components/TFASettingsSmsPhoneStep';
import { TFASettingsSmsCodeStep } from '@components/TFASettingsSmsCodeStep';

import { $step } from '@store/twoFaSetup';
import { blurTwoFaSettingsScreen, focusTwoFaSettingsScreen } from '@store/app';

import { styles as s } from './styles';
import { IScreenProps } from 'src/common/types';

export const TwoFactorAuthSettings: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;

  const [t] = useTranslation('TwoFactorAuthSettings');

  const step = useStore($step);

  React.useEffect(
    () => navigation.addListener('focus', () => focusTwoFaSettingsScreen()),
    [navigation]
  );

  React.useEffect(
    () => navigation.addListener('blur', () => blurTwoFaSettingsScreen()),
    [navigation]
  );

  const renderStep = () => {
    switch (step) {
      case 'init_enable':
        return <TFASettingsInitEnableStep />;
      case 'google_qr':
        return <TFASettingsGoogleQRStep />;
      case 'google_code':
        return <TFASettingsGoogleCodeStep />;
      case 'sms_phone':
        return <TFASettingsSmsPhoneStep />;
      case 'sms_code':
        return <TFASettingsSmsCodeStep />;
    }
  };

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('backButtonText')} />

      <ScrollView style={s.sv}>{renderStep()}</ScrollView>
    </SafeAreaView>
  );
};
