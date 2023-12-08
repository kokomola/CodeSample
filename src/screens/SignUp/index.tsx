import * as React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import {
  $email,
  $emailErrors,
  $emailInFocus,
  $emailTouched,
  $isFormValid,
  $name,
  $nameErrors,
  $nameInFocus,
  $nameTouched,
  $password,
  $passwordErrors,
  $passwordInFocus,
  $passwordTouched,
  $phone,
  $phoneErrors,
  $phoneInFocus,
  $phoneTouched,
  $referral,
  $referralDisabled,
  $referralInFocus,
  blurEmail,
  blurName,
  blurPassword,
  blurPhone,
  blurReferral,
  changeEmail,
  changeName,
  changePassword,
  changePhone,
  changeReferral,
  focusEmail,
  focusName,
  focusPassword,
  focusPhone,
  focusReferral,
  submit,
} from '@store/signUpForm';
import { signUpRequestFx } from '@store/api';

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

import { styles as s } from './styles';
import { SignUpScreenProps } from './types';
import { $referralName } from '@store/referralSystem';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';

const EmailInput: React.FC = () => {
  const { t } = useTranslation('SignUp');
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
  const { t } = useTranslation('SignUp');
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

const NameInput: React.FC = () => {
  const { t } = useTranslation('SignUp');
  const value = useStore($name);
  const inFocus = useStore($nameInFocus);
  const touched = useStore($nameTouched);
  const errors = useStore($nameErrors);

  return (
    <View>
      <Input
        value={value}
        onChangeText={changeName}
        onFocus={focusName}
        onBlur={blurName}
        placeholder={t('namePlaceholder')}
        focused={inFocus}
        autoCompleteType="name"
        keyboardType="default"
      />

      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

const PhoneInput: React.FC = () => {
  const { t } = useTranslation('SignUp');
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
        placeholder={t('phonePlaceholder')}
        focused={inFocus}
        autoCompleteType="tel"
        autoCapitalize="none"
        keyboardType="phone-pad"
      />

      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

const ReferralInput: React.FC = () => {
  const { t } = useTranslation('SignUp');
  const value = useStore($referral);
  const referralName = useStore($referralName);
  const inFocus = useStore($referralInFocus);
  const isDisabled = useStore($referralDisabled);

  return (
    <View>
      <Input
        value={!isDisabled ? value : referralName!}
        onChangeText={changeReferral}
        onFocus={focusReferral}
        onBlur={blurReferral}
        placeholder={t('referralPlaceholder')}
        focused={inFocus}
        autoCompleteType="email"
        autoCapitalize="none"
        keyboardType="email-address"
        disabled={isDisabled}
      />
    </View>
  );
};

export const SignUp: React.FC<SignUpScreenProps> = () => {
  const { t } = useTranslation('SignUp');
  const loading = useStore(signUpRequestFx.pending);
  const isFormValid = useStore($isFormValid);

  return (
    <SafeAreaView style={s.sav}>
      <AKeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps="always">
          <Box>
            <BackButton />

            <ScreenTitle title={t('title')} />

            <InputsBox>
              <EmailInput />
              <PassInput />
              <NameInput />
              <PhoneInput />
              <ReferralInput />
            </InputsBox>

            <Button
              text={t('submit')}
              onPress={submit}
              loading={loading}
              disabled={!isFormValid}
            />
          </Box>
        </ScrollView>
      </AKeyboardAvoidingView>
    </SafeAreaView>
  );
};
