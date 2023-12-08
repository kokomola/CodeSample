import * as React from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Input } from '@components/uikit/Input';
import { Button } from '@components/uikit';

import {
  $isFormValid,
  $phone,
  $phoneErrors,
  $phoneInFocus,
  $phoneTouched,
  blurPhone,
  changePhone,
  focusPhone,
  pressVerifySmsPhone,
} from '@store/twoFaSetup';

import { styles as s } from './styles';
import { InputError } from '@components/uikit/InputError';

const PhoneInput: React.FC = () => {
  const [t] = useTranslation('TFASettingsSmsPhoneStep');
  const value = useStore($phone);
  const inFocus = useStore($phoneInFocus);
  const touched = useStore($phoneTouched);
  const errors = useStore($phoneErrors);

  return (
    <View>
      <Input
        value={value}
        onChangeText={changePhone}
        onFocus={focusPhone}
        onBlur={blurPhone}
        placeholder={t('phoneInputPlaceholder')}
        focused={inFocus}
        autoCompleteType="tel"
        autoCapitalize="none"
        keyboardType="phone-pad"
      />

      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

export const TFASettingsSmsPhoneStep: React.FC = () => {
  const [t] = useTranslation('TFASettingsSmsPhoneStep');
  const isFormValid = useStore($isFormValid);

  return (
    <View style={s.box}>
      <PhoneInput />

      <View style={s.buttonBox}>
        <Button
          disabled={!isFormValid}
          text={t('submitButtonText')}
          onPress={pressVerifySmsPhone}
        />
      </View>
    </View>
  );
};
