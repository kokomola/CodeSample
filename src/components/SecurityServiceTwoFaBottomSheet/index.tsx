import * as React from 'react';
import {useTranslation} from 'react-i18next';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {
  $code,
  $codeInFocus,
  $codeTouched,
  blurCode,
  changeCode,
  closeTwoFaBottomSheet,
  focusCode,
  submitCode,
  TwoFaBottomSheetRef,
  twoFaStageFx,
} from '@store/securityService';
import {Text, View} from 'react-native';
import {styles as s} from './styles';
import {useStore} from 'effector-react';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {Input} from '@components/uikit/Input';
import {Button} from '@components/uikit';

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
          value={value}
          onChangeText={changeCode}
          onFocus={focusCode}
          onBlur={blurCode}
          placeholder={t('codeInputPlaceholder')}
          focused={inFocus}
          keyboardType="number-pad"
          style={s.input}
          textAlign="center"
        />

        {/*<InputError style={s.error} visible={touched} error={errors[0]} />*/}
      </View>
    </NativeViewGestureHandler>
  );
};

export const SecurityServiceTwoFaBottomSheet: React.FC = () => {
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

  const isLoading = useStore(twoFaStageFx.pending);
  const isFormValid = true; // should we add validation for this form?

  return (
    <BottomSheet
      ref={TwoFaBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={BottomSheetBackdrop}
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
              onPress={closeTwoFaBottomSheet}
            />
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
