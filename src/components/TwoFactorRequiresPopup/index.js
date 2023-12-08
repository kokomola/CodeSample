import React from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { View, Text, Linking, StyleSheet } from 'react-native';

import Popup from '../common/Popup';
import PrimaryButton from '../common/PrimaryButton';
import SecondaryButton from '../common/SecondaryButton';

import {
  $twoFactorRequiresPopup,
  TwoFactorRequiresPopupApi
} from '../../store/twoFactor';

const TwoFactorRequiresPopup = () => {
  const [t] = useTranslation('TwoFactorRequiresPopup');
  const isOpen = useStore($twoFactorRequiresPopup);
  const { close } = TwoFactorRequiresPopupApi;

  const openUrl = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('unsupported linking url');
      }
    });
  };

  return (
    <Popup isOpen={isOpen} onClose={close}>
      <View style={s.box}>
        <Text style={s.title}>{t('title')}</Text>
        <Text style={s.text}>{t('text')}</Text>

        <View style={s.button}>
          <PrimaryButton
            title={t('open')}
            onPress={() =>
              openUrl('https://account.amir.capital/front/dashboard/profile')
            }
          />
        </View>
        <View style={s.button}>
          <SecondaryButton title={t('close')} onPress={close} />
        </View>
      </View>
    </Popup>
  );
};

const s = StyleSheet.create({
  box: {
    padding: 16
  },
  title: {
    fontFamily: 'Exo2-Regular',
    fontSize: 12,
    color: '#460000',
    paddingBottom: 16
  },
  text: {
    fontFamily: 'Exo2-Regular',
    fontSize: 12,
    color: '#040c13'
  },
  button: {
    paddingTop: 16
  }
});

export default TwoFactorRequiresPopup;
