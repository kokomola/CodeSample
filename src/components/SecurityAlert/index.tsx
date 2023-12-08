import * as React from 'react';

import { ActivityIndicator, Text, View } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@components/uikit/Button';
import { CircleIcon } from '@components/uikit/Icon';

import {
  $isPassedKyc,
  $userHas2faSecurityAlert,
  redirectKycSetupFx,
} from '@store/user';
import { $detectingKyc, $isInProcess } from '@store/kyc';

import { KycInProcess } from '@components/KycInProcess';
import { purple500 } from '@constants/colors';
import * as colors from '@constants/colors';
import { styles as s } from './styles';

const NeedKycAlert: React.FC = () => {
  const [t] = useTranslation('SecurityAlert');

  return (
    <>
      <Text style={s.title}>{t('kycAlertTitle')}</Text>
      <Text style={s.text}>{t('kycAlertText')}</Text>
      <Button text={t('kycAlertButtonText')} onPress={redirectKycSetupFx} />
    </>
  );
};

export const SecurityAlert: React.FC = () => {
  const [t] = useTranslation('SecurityAlert');

  const isPassedKyc = useStore($isPassedKyc);
  const isInProcess = useStore($isInProcess);
  //const has2faAlert = useStore($userHas2faSecurityAlert);
  const detectingKyc = useStore($detectingKyc);

  if (detectingKyc) {
    return <ActivityIndicator size="small" color={purple500} />;
  }

  return (
    <View>
      {!isPassedKyc && (
        <View style={s.box}>
          <View style={s.icon}>
            <CircleIcon icon="lockOpen" color={colors.purple500} />
          </View>
          {!isInProcess ? <NeedKycAlert /> : <KycInProcess />}
        </View>
      )}
    </View>
  );
};

/* if (!isPassedKyc) {
  return (
    <View style={s.box}>
      <View style={s.icon}>
        <CircleIcon icon="lockOpen" color={colors.purple500} />
      </View>
      {!isInProcess ? <NeedKycAlert /> : <KycInProcess />}
    </View>
  );
}

if (isPassedKyc && has2faAlert) {
  return (
    <View style={s.box}>
      <View style={s.icon}>
        <CircleIcon icon="lockOpen" color={colors.purple500} />
      </View>
      <Text style={s.title}>{t('tfaAlertTitle')}</Text>
      <Text style={s.text}>{t('tfaAlertText')}</Text>
      <Button text={t('tfaAlertButtonText')} onPress={redirect2faSetupFx} />
    </View>
  );
} */
