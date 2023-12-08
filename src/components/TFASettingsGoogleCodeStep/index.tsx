import * as React from 'react';
import { View } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { Input } from '@components/uikit/Input';
import { Button } from '@components/uikit/Button';

import {
  $code,
  $codeInFocus,
  $codeTouched,
  blurCode,
  changeCode,
  focusCode,
  pressVerifyGoogleCode,
} from '@store/twoFaSetup';

import { styles as s } from './styles';

const CodeInput: React.FC = () => {
  const [t] = useTranslation('TFASettingsGoogleCodeStep');

  const value = useStore($code);
  const inFocus = useStore($codeInFocus);
  const touched = useStore($codeTouched);

  return (
    <View>
      <Input
        value={value}
        onChangeText={changeCode}
        onFocus={focusCode}
        onBlur={blurCode}
        placeholder={t('codeInputPlaceholder')}
        focused={inFocus}
        keyboardType="number-pad"
      />
    </View>
  );
};

export const TFASettingsGoogleCodeStep: React.FC = () => {
  const [t] = useTranslation('TFASettingsGoogleCodeStep');

  return (
    <View style={s.box}>
      <CodeInput />

      <View style={s.buttonBox}>
        <Button text={t('submit')} onPress={pressVerifyGoogleCode} />
      </View>
    </View>
  );
};
