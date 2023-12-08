import React from 'react';
import { View, Text } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import {
  $isCheckedSunriseAgree,
  acceptSunriseAgree,
  agreeSunriseTermsFx,
  cancelSunriseAgree,
  toggleSunriseAgree,
} from '@store/sunrise/agreement';
import { Button, CheckBox } from '@components/uikit';
import { useOpenUrl } from 'src/hooks/useOpenUrl';
import { SUNRISE_AGREE_RU } from 'src/config';
import { styles as s } from './styles';

export const SunriseAgreement = () => {
  const { t } = useTranslation('SunriseDomain');
  const openUrl = useOpenUrl(SUNRISE_AGREE_RU);

  const isCheckedAgreed = useStore($isCheckedSunriseAgree);
  const loading = useStore(agreeSunriseTermsFx.pending);

  return (
    <View style={s.box}>
      <Text style={s.title}>{t('title')}</Text>

      <Text>
        {t('desc_1')}
        <Text style={s.link} onPress={openUrl}>
          {t('desc_2')}.
        </Text>
      </Text>
      <View style={s.agreeBox}>
        <CheckBox checked={isCheckedAgreed} onPress={toggleSunriseAgree} />
        <Text style={s.agreeText}>{t('confirm')}</Text>
      </View>

      <View style={s.btnBox}>
        <View style={s.btnWrapper}>
          <Button
            kind="SheetButton"
            type="secondary"
            text={t('no')}
            onPress={() => cancelSunriseAgree()}
          />
        </View>

        <View style={s.btnWrapper}>
          <Button
            disabled={!isCheckedAgreed}
            loading={loading}
            kind="SheetButton"
            type="secondary"
            text={t('yes')}
            onPress={() => acceptSunriseAgree()}
          />
        </View>
      </View>
    </View>
  );
};
