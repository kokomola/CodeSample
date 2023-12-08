import * as React from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { Input } from '@components/uikit/Input';
import { Button } from '@components/uikit';

import { styles as s } from './styles';
import {
  $code,
  $codeInFocus,
  $codeTouched,
  blurCode,
  changeCode,
  focusCode,
  pressVerifySmsCode,
} from '@store/twoFaSetup';
import { View } from 'react-native';

const CodeInput: React.FC = () => {
  const [t] = useTranslation('TFASettingsSmsCodeStep');

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

export const TFASettingsSmsCodeStep: React.FC = () => {
  const [t] = useTranslation('TFASettingsSmsCodeStep');

  return (
    <View style={s.box}>
      <CodeInput />

      <View style={s.buttonBox}>
        <Button text={t('submitButtonText')} onPress={pressVerifySmsCode} />
      </View>
    </View>
  );
};
