import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import {
  $pin,
  changePin,
  loginPinFx,
  focusLoginPinScreen,
  blurLoginPinScreen,
} from '@store/loginPIN';
import { logout } from '@store/logout';

import PINForm from '@components/auth/PINForm';

import { styles as s } from './styles';
import { IScreenProps } from 'src/common/types';

export const LoginPIN: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;
  const { t } = useTranslation('PIN');

  // temp
  /*   useEffect(() => {
    changePin('3333');
    setTimeout(() => {
      submit();
    }, 3000);
  }, []); */

  useEffect(
    () => navigation.addListener('focus', () => focusLoginPinScreen()),
    [navigation]
  );

  useEffect(
    () => navigation.addListener('blur', () => blurLoginPinScreen()),
    [navigation]
  );

  const pin = useStore($pin);
  const loading = useStore(loginPinFx.pending);

  return (
    <SafeAreaView style={s.sav}>
      <PINForm
        tip={t('PINFormTip')}
        pin={pin}
        onChange={changePin}
        loading={loading}
        signOut={logout}
      />
    </SafeAreaView>
  );
};
