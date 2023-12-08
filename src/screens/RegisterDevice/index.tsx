import * as React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useStore} from 'effector-react';

import {
  $code,
  $codeInFocus,
  blurCode,
  changeCode,
  focusCode,
  registerDeviceFx,
  submit,
} from '@store/registerDeviceForm';

import {Input} from '@components/uikit/Input';
import {Button} from '@components/uikit/Button';
import {
  Box,
  ScreenTitle,
  BackButton,
  InputsBox,
  Tip,
} from '@components/AuthLayout';

import {styles as s} from './styles';
import {blurRegisterDeviceScreen, focusRegisterDeviceScreen} from '@store/app';
import {AKeyboardAvoidingView} from '../AKeyboardAvoidingView';
import {IScreenProps} from 'src/common/types';

const CodeInput: React.FC = () => {
  const {t} = useTranslation('RegisterDevice');
  const value = useStore($code);
  const inFocus = useStore($codeInFocus);

  return (
    <View>
      <Input
        value={value}
        onChangeText={changeCode}
        onFocus={focusCode}
        onBlur={blurCode}
        placeholder={t('codePlaceholder')}
        focused={inFocus}
        autoCompleteType="off"
        keyboardType="number-pad"
      />
    </View>
  );
};

export const RegisterDevice: React.FC<IScreenProps> = ({navigation}) => {
  const {t} = useTranslation('RegisterDevice');

  navigation.addListener('focus', () => focusRegisterDeviceScreen());
  navigation.addListener('blur', () => blurRegisterDeviceScreen());

  const loading = useStore(registerDeviceFx.pending);

  return (
    <SafeAreaView style={s.sav}>
      <AKeyboardAvoidingView>
        <ScrollView>
          <Box>
            <BackButton disabled />

            <ScreenTitle title={t('title')} />

            <Tip tip={t('tip')} />

            <InputsBox>
              <CodeInput />
            </InputsBox>

            <Button
              loading={loading}
              text={t('submit')}
              onPress={() => submit()}
            />
          </Box>
        </ScrollView>
      </AKeyboardAvoidingView>
    </SafeAreaView>
  );
};
