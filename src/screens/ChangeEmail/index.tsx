import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { BackButton } from '@components/layout/BackButton';
import { Button } from '@components/uikit/Button';
import TextInput from '@components/common/CustomTextInput';
import { InputError } from '@components/uikit/InputError';

import { styles as s } from './styles';
import {
  $isFormValid,
  $newEmail,
  $newEmailErrors,
  $newEmailInFocus,
  $newEmailTouched,
  blurNewEmail,
  changeNewEmail,
  changeEmailFx,
  focusNewEmail,
  submit,
} from '@store/changeEmail';
import { blurChangeEmailScreen, focusChangeEmailScreen } from '@store/app';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';
import { IScreenProps } from 'src/common/types';

const NewEmailInput: React.FC = () => {
  const { t } = useTranslation('ChangeEmail');

  const value = useStore($newEmail);
  const inFocus = useStore($newEmailInFocus);
  const touched = useStore($newEmailTouched);
  const errors = useStore($newEmailErrors);

  return (
    <View style={s.inputBox}>
      <TextInput
        value={value}
        onChangeText={changeNewEmail}
        onFocus={focusNewEmail}
        onBlur={blurNewEmail}
        placeholder={t('newEmailPlaceholder')}
        autoCapitalize="none"
        focused={inFocus}
      />

      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

export const ChangeEmail: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;
  const [t] = useTranslation('ChangeEmail');

  const isLoading = useStore(changeEmailFx.pending);
  const isFormValid = useStore($isFormValid);

  React.useEffect(
    () => navigation.addListener('focus', () => focusChangeEmailScreen()),
    [navigation]
  );
  React.useEffect(
    () => navigation.addListener('blur', () => blurChangeEmailScreen()),
    [navigation]
  );

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('backButtonText')} />

      <AKeyboardAvoidingView>
        <ScrollView style={s.sv}>
          <View style={s.box}>
            <NewEmailInput />

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
