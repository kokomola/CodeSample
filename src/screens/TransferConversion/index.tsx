import * as React from 'react';
import {SafeAreaView, ScrollView, View, Text, Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useStore} from 'effector-react';

import {BackButton} from '@components/layout/BackButton';
import {
  AccountSelector,
  AccountSelectorPagination,
} from '@components/uikit/AccountSelector';
import {Button} from '@components/uikit/Button';
import {Input} from '@components/uikit/Input';
import {InputError} from '@components/uikit/InputError';

import {
  blurTransferConversionScreen,
  focusTransferConversionScreen,
} from '@store/app';
import {$wallets} from '@store/wallets';
import {
  $amount,
  $amountErrors,
  $amountInFocus,
  $amountTouched,
  $course,
  $destinationAmount,
  $destinationAmountErrors,
  $destinationAmountInFocus,
  $destinationAmountTouched,
  $fromErrors,
  $fromIdx,
  $isFormValid,
  $toIdx,
  blurAmount,
  blurDestinationAmount,
  onChangeAmount,
  onChangeDestinationAmount,
  changeFromIdx,
  changeToIdx,
  focusAmount,
  focusDestinationAmount,
  fromAccountCarouselRef,
  pressSubmit,
  transferConversionFx,
} from '@store/transferConversion';

import {styles as s} from './styles';
import {TransferConversionScreenProps} from './types';
import {VerifyCodeBottomSheet} from '@components/VerifyCodeBottomSheet';
import {AKeyboardAvoidingView} from '../AKeyboardAvoidingView';

const FromFundPicker: React.FC = () => {
  const wallets = useStore($wallets);
  const activeSlide = useStore($fromIdx);
  const errors = useStore($fromErrors);
  return (
    <>
      <View style={s.pickerBox}>
        <AccountSelector
          accounts={wallets}
          activeSlide={activeSlide}
          onSnapToItem={changeFromIdx}
          carouselRef={fromAccountCarouselRef}
          sliderWidth={Dimensions.get('screen').width}
          itemWidth={Dimensions.get('screen').width - 32}
        />
        <AccountSelectorPagination
          accounts={wallets}
          activeSlide={activeSlide}
        />
      </View>
      <View style={s.pickerErrorBox}>
        <InputError visible={Boolean(errors[0])} error={errors[0]} />
      </View>
    </>
  );
};

const AmountInput: React.FC = () => {
  const {t} = useTranslation('TransferConversion');
  const value = useStore($amount);
  const inFocus = useStore($amountInFocus);
  const touched = useStore($amountTouched);
  const errors = useStore($amountErrors);

  return (
    <View style={s.inputBox}>
      <Input
        value={value}
        onChangeText={onChangeAmount}
        onFocus={focusAmount}
        onBlur={blurAmount}
        placeholder={t('amountPlaceholder')}
        focused={inFocus}
        keyboardType="numeric"
      />

      <InputError visible={inFocus || touched} error={errors[0]} />
    </View>
  );
};

const DestinationAmountInput: React.FC = () => {
  const {t} = useTranslation('TransferConversion');
  const value = useStore($destinationAmount);
  const inFocus = useStore($destinationAmountInFocus);
  const touched = useStore($destinationAmountTouched);
  const errors = useStore($destinationAmountErrors);

  return (
    <View style={s.inputBox}>
      <Input
        value={value}
        onChangeText={onChangeDestinationAmount}
        onFocus={focusDestinationAmount}
        onBlur={blurDestinationAmount}
        placeholder={t('destinationAmountPlaceholder')}
        focused={inFocus}
        keyboardType="numeric"
      />

      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

const ToFundPicker: React.FC = () => {
  const wallets = useStore($wallets);
  const activeSlide = useStore($toIdx);
  return (
    <View style={s.pickerBox}>
      <AccountSelector
        accounts={wallets}
        activeSlide={activeSlide}
        onSnapToItem={changeToIdx}
        carouselRef={fromAccountCarouselRef}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width - 32}
      />

      <AccountSelectorPagination accounts={wallets} activeSlide={activeSlide} />
    </View>
  );
};

const Course: React.FC = () => {
  const [t] = useTranslation('TransferConversion');
  const course = useStore($course);

  if (!course) return null;

  return (
    <Text style={s.course}>
      {t('courseOne')} {course.from} {t('courseTwo')} {course.to}
    </Text>
  );
};

export const TransferConversion: React.FC<
  TransferConversionScreenProps
> = props => {
  const [t] = useTranslation('TransferConversion');

  const {navigation} = props;

  React.useEffect(
    () =>
      navigation.addListener('focus', () => focusTransferConversionScreen()),
    [navigation],
  );

  React.useEffect(
    () => navigation.addListener('blur', () => blurTransferConversionScreen()),
    [navigation],
  );

  const isLoading = useStore(transferConversionFx.pending);
  const isFormValid = useStore($isFormValid);

  return (
    <SafeAreaView style={s.sav}>
      <AKeyboardAvoidingView>
        <ScrollView style={s.sv} keyboardShouldPersistTaps="always">
          <BackButton text={t('screenTitle')} />

          <FromFundPicker />
          <AmountInput />
          <Course />
          <DestinationAmountInput />
          <ToFundPicker />

          <View style={s.buttonBox}>
            <Button
              text={t('submitButtonText')}
              onPress={pressSubmit}
              loading={isLoading}
              disabled={!isFormValid}
            />
          </View>
        </ScrollView>
      </AKeyboardAvoidingView>
      <VerifyCodeBottomSheet />
    </SafeAreaView>
  );
};
