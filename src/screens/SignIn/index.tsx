import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import {
  $email,
  $password,
  changeCaptcha,
  changeCaptchaRef,
  changeEmail,
  changePassword,
  pressSignIn,
  $loading,
  $isFormValid,
  $emailInFocus,
  $emailTouched,
  $emailErrors,
  $passwordInFocus,
  $passwordTouched,
  $passwordErrors,
  focusEmail,
  blurEmail,
  focusPassword,
  blurPassword,
  focusSignInScreen,
  blurSignInScreen,
  changeLoadingCaptcha,
} from '@store/signInForm';

import { Button } from '@components/uikit/Button';
import { Input } from '@components/uikit/Input';
import { PasswordInput } from '@components/uikit/PasswordInput';
import { InputError } from '@components/uikit/InputError';
import {
  Box,
  ScreenTitle,
  BackButton,
  InputsBox,
} from '@components/AuthLayout';

import { RECAPTCHA_HOST } from 'src/config';
import { SignInScreenProps } from './types';
import { styles as s } from './styles';
import { logline } from '@utils/debug';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';
import { getRecaptchaSiteKeyByMode } from '@utils/getEnv';
import { transparent } from '@constants/colors';
import Recaptcha from '@components/common/Recaptcha';

const EmailInput: React.FC = () => {
  const { t } = useTranslation('SignIn');
  const value = useStore($email);
  const inFocus = useStore($emailInFocus);
  const touched = useStore($emailTouched);
  const errors = useStore($emailErrors);

  return (
    <View>
      <Input
        value={value}
        onChangeText={changeEmail}
        onFocus={focusEmail}
        onBlur={blurEmail}
        placeholder={t('emailPlaceholder')}
        focused={inFocus}
        autoCompleteType="email"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

const PassInput: React.FC = () => {
  const { t } = useTranslation('SignIn');
  const value = useStore($password);
  const inFocus = useStore($passwordInFocus);
  const touched = useStore($passwordTouched);
  const errors = useStore($passwordErrors);

  return (
    <View>
      <PasswordInput
        value={value}
        onChangeText={changePassword}
        onFocus={focusPassword}
        onBlur={blurPassword}
        placeholder={t('passwordPlaceholder')}
        focused={inFocus}
        autoCompleteType="password"
        autoCapitalize="none"
      />

      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

const RecaptchaInput: any = React.forwardRef((_, ref) => {
  React.useEffect(() => {
    changeCaptchaRef(ref);
  }, [ref]);

  return (
    <View>
      <Recaptcha
        ref={ref}
        style={{ opacity: 0.99 }}
        siteKey={getRecaptchaSiteKeyByMode()}
        baseUrl={RECAPTCHA_HOST}
        onVerify={(token: string) => {
          changeCaptcha(token);
          pressSignIn();
        }}
        onExpire={() => {
          Alert.alert('Recapthca', 'Token is expired');
          changeCaptcha('');
        }}
        onError={() => {
          changeCaptcha('');
        }}
        style={{ height: 0, width: 0, backgroundColor: transparent }}
        size="invisible"
        enterprise
      />
    </View>
  );
});

export const SignIn: React.FC<SignInScreenProps> = (props) => {
  const { navigation } = props;
  const [countRecaptcha, setCountRecaptcha] = useState(0);

  const { t } = useTranslation('SignIn');
  const reCaptchaRef = useRef<any>();
  const loading = useStore($loading);
  const isFormValid = useStore($isFormValid);

  useEffect(() => {
    logline('', { countRecaptcha });
  }, [countRecaptcha]);

  useEffect(() => navigation.addListener('focus', () => focusSignInScreen()), [
    navigation,
  ]);

  useEffect(() => navigation.addListener('blur', () => blurSignInScreen()), [
    navigation,
  ]);

  return (
    <SafeAreaView style={s.sav}>
      <AKeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps="always" overScrollMode="never">
          <Box>
            <BackButton />

            <ScreenTitle title={t('title')} />

            <InputsBox>
              <EmailInput />
              <PassInput />

              <RecaptchaInput key={Number(countRecaptcha)} ref={reCaptchaRef} />
            </InputsBox>

            <Button
              text={t('submit')}
              onPress={() => {
                changeLoadingCaptcha(true);
                reCaptchaRef.current.open();
              }}
              disabled={!isFormValid}
              loading={loading}
            />
          </Box>
        </ScrollView>
      </AKeyboardAvoidingView>
    </SafeAreaView>
  );
};
