import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  $code,
  $codeInFocus,
  $codeTouched,
  blurCode,
  changeCode,
  focusCode,
  submitCode,
  twoFaStageFx,
} from '@store/twoFaVerify';
import { useStore } from 'effector-react';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { Input } from '@components/uikit/Input';
import { Button } from '@components/uikit';
import { closeBS } from '@store/bottomSheetCommon';
import { styles as s } from './styles';

const CodeInput: React.FC = () => {
  const [t] = useTranslation('SecurityServiceTwoFaBottomSheet');

  const value = useStore($code);
  const inFocus = useStore($codeInFocus);
  const touched = useStore($codeTouched);
  // const errors = useStore($verifyCodeErrors);

  return (
    <NativeViewGestureHandler disallowInterruption={true}>
      <View style={s.inputBox}>
        <Input
          style={s.input}
          value={value}
          onChangeText={changeCode}
          onFocus={focusCode}
          onBlur={blurCode}
          placeholder={t('codeInputPlaceholder')}
          focused={inFocus}
          keyboardType="number-pad"
          textAlign="center"
        />

        {/*<InputError style={s.error} visible={touched} error={errors[0]} />*/}
      </View>
    </NativeViewGestureHandler>
  );
};

export const TwoFaVerifyForm: React.FC = () => {
  const [t] = useTranslation('SecurityServiceTwoFaBottomSheet');

  const isLoading = useStore(twoFaStageFx.pending);
  const isFormValid = true; // should we add validation for this form?

  return (
    <View style={s.box}>
      <Text style={s.title}>{t('title')}</Text>
      <Text style={s.tip}>{t('tip')}</Text>
      <CodeInput />
      <View style={s.button}>
        <Button
          kind="SheetButton"
          text={t('submitButtonText')}
          onPress={submitCode}
          loading={isLoading}
          disabled={!isFormValid || isLoading}
        />
      </View>
      <View style={s.button}>
        <Button
          kind="SheetButton"
          type="ghost"
          text={t('cancelButtonText')}
          onPress={closeBS}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};
