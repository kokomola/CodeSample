import * as React from 'react';
import {SafeAreaView, View} from 'react-native';
import {useStore} from 'effector-react';
import {useTranslation} from 'react-i18next';

import PINForm from '@components/auth/PINForm';
import {
  blurSetupPinScreen,
  focusSetupPinScreen,
  changePin,
  $pin,
  $confirmPin,
  $step,
  changeConfirmPin,
  $error,
  setupPinFx,
} from '@store/setupPIN';
import {logout} from '@store/logout';

import {styles as s} from './styles';
import {Text} from 'react-native-svg';
import {IScreenProps} from 'src/common/types';

export const SetupPIN: React.FC<IScreenProps> = props => {
  const {navigation} = props;
  const {t} = useTranslation('SetupPIN');

  const step = useStore($step);
  const pin = useStore($pin);
  const confirmPin = useStore($confirmPin);
  const error = useStore($error);
  const loading = useStore(setupPinFx.pending);

  React.useEffect(
    () => navigation.addListener('focus', () => focusSetupPinScreen()),
    [navigation],
  );

  React.useEffect(
    () => navigation.addListener('blur', () => blurSetupPinScreen()),
    [navigation],
  );

  return (
    <SafeAreaView style={s.sav}>
      {step === 'pin' && (
        <PINForm
          tip={t('step1Title')}
          pin={pin}
          onChange={changePin}
          signOut={logout}
          error={error}
          loading={false}
        />
      )}
      {step === 'confirm' && (
        <PINForm
          tip={t('step2Title')}
          pin={confirmPin}
          onChange={changeConfirmPin}
          signOut={logout}
          error={error}
          loading={loading}
        />
      )}
      <Text>{step}</Text>
    </SafeAreaView>
  );
};
