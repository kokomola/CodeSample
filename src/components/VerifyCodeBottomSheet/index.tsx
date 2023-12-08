import * as React from 'react';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import {Text, View, Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useStore} from 'effector-react';

import {Input} from '@components/uikit/Input';
import {InputError} from '@components/uikit/InputError';
import {Button} from '@components/uikit/Button';

import {
  NativeViewGestureHandler,
  //TextInput,
} from 'react-native-gesture-handler';

import {styles as s} from './styles';
import {
  $isVerifyFormValid,
  $verifyBottomSheetRef,
  $verifyCode,
  $verifyCodeErrors,
  $verifyCodeInFocus,
  $verifyCodeTouched,
  blurVerifyCode,
  changeVerifyCode,
  closeVerifyBottomSheet,
  focusVerifyCode,
  pressSubmitVerifyCode,
  verifyRequestFx,
} from '@store/verify';
//import { linelog } from '@utils/debug';

// https://devsday.ru/blog/details/44639

const CodeInput: React.FC = () => {
  const {t} = useTranslation('SecurityServiceTwoFaBottomSheet');

  const value = useStore($verifyCode);
  const inFocus = useStore($verifyCodeInFocus);
  const touched = useStore($verifyCodeTouched);
  const errors = useStore($verifyCodeErrors);

  // https://gorhom.github.io/react-native-bottom-sheet/troubleshooting
  // https://www.gitmemory.com/issue/software-mansion/react-native-gesture-handler/1067/677603899
  // or TextInput from gesture
  return (
    <NativeViewGestureHandler disallowInterruption={true}>
      <View style={s.inputBox}>
        <Input
          value={value}
          onChangeText={changeVerifyCode}
          onFocus={focusVerifyCode}
          onBlur={blurVerifyCode}
          placeholder={t('codeInputPlaceholder')}
          focused={inFocus}
          keyboardType="number-pad"
          style={s.input}
          textAlign="center"
        />

        <InputError style={s.error} visible={touched} error={errors[0]} />
      </View>
    </NativeViewGestureHandler>
  );
};

export const VerifyCodeBottomSheet: React.FC = () => {
  const [t] = useTranslation('SecurityServiceTwoFaBottomSheet');

  const [containerHeight, setContainerHeight] = React.useState(1);
  const snapPoints = React.useMemo(() => {
    return [1, containerHeight || 300];
  }, [containerHeight]);

  const handleOnLayout = React.useCallback(
    ({
      nativeEvent: {
        layout: {height},
      },
    }) => {
      setContainerHeight(height + 230);
    },
    [],
  );

  const loading = useStore(verifyRequestFx.pending);
  const isFormValid = useStore($isVerifyFormValid);
  const bottomSheetRef = useStore($verifyBottomSheetRef);

  if (!bottomSheetRef) return null;

  return (
    <>
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backdropComponent={BottomSheetBackdrop}
          index={-1} // Hide the bottom sheet when we first load our component
          containerHeight={0}
          bottomInset={0}
          topInset={100}
          enablePanDownToClose={true}>
          <BottomSheetScrollView onLayout={handleOnLayout}>
            <View style={s.box}>
              <Text style={s.title}>{t('title')}</Text>
              <Text style={s.tip}>{t('tip')}</Text>
              <CodeInput />
              <View style={s.button}>
                <Button
                  kind="SheetButton"
                  text={t('submitButtonText')}
                  onPress={pressSubmitVerifyCode}
                  loading={loading}
                  disabled={!isFormValid || loading}
                />
              </View>
              <View style={s.button}>
                <Button
                  kind="SheetButton"
                  type="ghost"
                  text={t('cancelButtonText')}
                  onPress={closeVerifyBottomSheet}
                />
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </Portal>
      <PortalHost name="verificationHost" />
    </>
  );
};
