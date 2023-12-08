import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { BackButton } from '@components/layout/BackButton';
import { Button } from '@components/uikit/Button';
import { PasswordInput } from '@components/uikit/PasswordInput';
import { InputError } from '@components/uikit/InputError';
import { styles as s } from './styles';
import {
  $isFormValid,
  $newPassword,
  $newPasswordConfirm,
  $newPasswordConfirmErrors,
  $newPasswordConfirmInFocus,
  $newPasswordConfirmTouched,
  $newPasswordErrors,
  $newPasswordInFocus,
  $newPasswordTouched,
  $oldPassword,
  $oldPasswordErrors,
  $oldPasswordInFocus,
  $oldPasswordTouched,
  blurNewPassword,
  blurNewPasswordConfirm,
  blurOldPassword,
  changeNewPassword,
  changeNewPasswordConfirm,
  changeOldPassword,
  changePasswordFx,
  focusNewPassword,
  focusNewPasswordConfirm,
  focusOldPassword,
  submit,
} from '@store/changePassword';
import {
  blurChangePasswordScreen,
  focusChangePasswordScreen,
} from '@store/app';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';
import { IScreenProps } from 'src/common/types';

const OldPasswordInput: React.FC = () => {
  const { t } = useTranslation('ChangePassword');
  const value = useStore($oldPassword);
  const inFocus = useStore($oldPasswordInFocus);
  const touched = useStore($oldPasswordTouched);
  const errors = useStore($oldPasswordErrors);

  return (
    <View style={s.inputBox}>
      <PasswordInput
        value={value}
        onChangeText={changeOldPassword}
        onFocus={focusOldPassword}
        onBlur={blurOldPassword}
        placeholder={t('oldPasswordPlaceholder')}
        focused={inFocus}
        autoCompleteType="password"
        autoCapitalize="none"
      />

      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

const NewPasswordInput: React.FC = () => {
  const { t } = useTranslation('ChangePassword');
  const value = useStore($newPassword);
  const inFocus = useStore($newPasswordInFocus);
  const touched = useStore($newPasswordTouched);
  const errors = useStore($newPasswordErrors);

  return (
    <View style={s.inputBox}>
      <PasswordInput
        value={value}
        onChangeText={changeNewPassword}
        onFocus={focusNewPassword}
        onBlur={blurNewPassword}
        placeholder={t('newPasswordPlaceholder')}
        focused={inFocus}
        autoCompleteType="password"
        autoCapitalize="none"
      />

      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

const NewPasswordConfirmInput: React.FC = () => {
  const { t } = useTranslation('ChangePassword');
  const value = useStore($newPasswordConfirm);
  const inFocus = useStore($newPasswordConfirmInFocus);
  const touched = useStore($newPasswordConfirmTouched);
  const errors = useStore($newPasswordConfirmErrors);

  return (
    <View style={s.inputBox}>
      <PasswordInput
        value={value}
        onChangeText={changeNewPasswordConfirm}
        onFocus={focusNewPasswordConfirm}
        onBlur={blurNewPasswordConfirm}
        placeholder={t('newPasswordConfirmPlaceholder')}
        focused={inFocus}
        autoCompleteType="password"
        autoCapitalize="none"
      />

      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

export const ChangePassword: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;

  const [t] = useTranslation('ChangePassword');

  const isLoading = useStore(changePasswordFx.pending);
  const isFormValid = useStore($isFormValid);

  React.useEffect(
    () => navigation.addListener('focus', () => focusChangePasswordScreen()),
    [navigation]
  );

  React.useEffect(
    () => navigation.addListener('blur', () => blurChangePasswordScreen()),
    [navigation]
  );

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('backButtonText')} />

      <AKeyboardAvoidingView>
        <ScrollView style={s.sv}>
          <View style={s.box}>
            <View style={s.inputsBox}>
              <OldPasswordInput />
              <NewPasswordInput />
              <NewPasswordConfirmInput />
            </View>

            <Button
              onPress={submit}
              text={t('submitButtonText')}
              disabled={!isFormValid}
              loading={isLoading}
            />
          </View>
        </ScrollView>
      </AKeyboardAvoidingView>
    </SafeAreaView>
  );
};
