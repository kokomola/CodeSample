import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import {
  $qr,
  $qrShown,
  $secret,
  pressCopySecret,
  pressQrScanned,
  pressShowQr,
} from '@store/twoFaSetup';

import { Icon } from '@components/uikit/Icon';
import { Button } from '@components/uikit';

import { styles as s } from './styles';

export const TFASettingsGoogleQRStep: React.FC = () => {
  const [t] = useTranslation('TFASettingsGoogleQRStep');

  const qr = useStore($qr);
  const qrShown = useStore($qrShown);
  const secret = useStore($secret);

  return (
    <View style={s.step}>
      <View style={s.box}>
        <Text style={s.text}>{t('tip')}</Text>

        <View style={s.secret}>
          <View>
            <Text style={s.secretLabel}>{t('secretLabel')}</Text>
            <Text style={s.secretKey}>{secret}</Text>
          </View>

          <TouchableOpacity onPress={() => pressCopySecret()}>
            <Icon icon="copy" />
          </TouchableOpacity>
        </View>

        <View style={s.qrButtonBox}>
          {qrShown ? (
            <Image style={s.qrImage} source={{ uri: qr }} />
          ) : (
            <Button
              text={t('qrButtonText')}
              type="secondary"
              onPress={() => pressShowQr()}
            />
          )}
        </View>
      </View>

      <View style={s.box}>
        <Button text={t('nextButtonText')} onPress={pressQrScanned} />
      </View>
    </View>
  );
};
