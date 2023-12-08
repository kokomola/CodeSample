import * as React from 'react';
import { Text, View } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { TFAStatus } from '@components/TFAStatus';
import { Button } from '@components/uikit';

import {
  $detectingStatusTwoFa,
  $tfaDisabled,
  $tfaEnabled,
  enableGoogle2fa,
  enableSms2fa,
  pressDisable2fa,
} from '@store/twoFaSetup';

import { styles as s } from './styles';
import { Loading } from '@components/uikit/Loading';

export const TFASettingsInitEnableStep: React.FC = () => {
  const [t] = useTranslation('TFASettingsInitEnableStep');

  const isDisabled = useStore($tfaDisabled);
  const isEnabled = useStore($tfaEnabled);
  const detectingStatusTwoFa = useStore($detectingStatusTwoFa);

  if (detectingStatusTwoFa) {
    return <Loading size="small" />;
  }

  return (
    <View style={s.box}>
      <View style={s.tfaStatusBox}>
        <TFAStatus />
      </View>

      {isDisabled && (
        <>
          <Text style={s.text}>{t('disabledText')}</Text>

          <View style={s.buttons}>
            <View style={s.buttonBox}>
              <Button text={t('tfaAppButtonText')} onPress={enableGoogle2fa} />
            </View>
            {/* <View style={s.buttonBox}>
              <Button text={t('tfaPhoneButtonText')} onPress={enableSms2fa} />
            </View> */}
          </View>
        </>
      )}

      {isEnabled && (
        <View>
          <Button text={t('tfaDisableButtonText')} onPress={pressDisable2fa} />
        </View>
      )}
    </View>
  );
};
