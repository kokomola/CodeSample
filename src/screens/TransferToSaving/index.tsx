import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import {
  AccountSelector,
  AccountSelectorPagination,
} from '@components/uikit/AccountSelector';
import { $savings, $wallets } from '@store/wallets';
import {
  $amount,
  $amountErrors,
  $amountInFocus,
  $amountTouched,
  $idx,
  $isFormValid,
  blurAmount,
  changeIdx,
  focusAmount,
  onChangeAmount,
  pressSubmit,
  chooseForFullAmount,
  transferToSavingRequestFx,
} from '@store/transferToSaving';
import { widthScreen } from '@constants/platform';
import { BackButton } from '@components/layout/BackButton';
import { Button } from '@components/uikit/Button';
import { Input } from '@components/uikit/Input';
import { InputError } from '@components/uikit/InputError';
import {
  blurTransferToSavingScreen,
  focusTransferToSavingScreen,
} from '@store/app';
import { VerifyCodeBottomSheet } from '@components/VerifyCodeBottomSheet';
import * as RootNavigation from '../../navigator/RootNavigation';
import { styles as s } from './styles';
import * as colors from '@constants/colors';
import { Icon } from '@components/uikit/Icon';
import { TransferToSavingScreenProps } from './types';
import { redirectToTransferMenuFx } from '@store/transfer';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';
import { $isBlockedSavingAccount } from '@store/account/permissions';
import { $isVerifiedAnd2fa } from '@store/user';

const FromWalletPicker: React.FC = () => {
  const [t] = useTranslation('TransferToSaving');
  const wallets = useStore($wallets);
  const activeSlide = useStore($idx);
  const carouselRef = React.useRef<typeof AccountSelector>(null);
  return (
    <View style={s.as}>
      <AccountSelector
        textBeforeTitle={t('from')}
        accounts={wallets}
        activeSlide={activeSlide}
        onSnapToItem={changeIdx}
        carouselRef={carouselRef}
        sliderWidth={widthScreen}
        itemWidth={widthScreen - 32}
        scrollEnabled={false}
      />
    </View>
  );
};

const ToSavingPicker: React.FC = () => {
  const [t] = useTranslation('TransferToSaving');

  const savings = useStore($savings);
  const activeSlide = useStore($idx);
  const carouselRef = React.useRef<typeof AccountSelector>(null);
  return (
    <View style={s.as}>
      <AccountSelector
        textBeforeTitle={t('to')}
        accounts={savings}
        activeSlide={activeSlide}
        onSnapToItem={changeIdx}
        carouselRef={carouselRef}
        sliderWidth={widthScreen}
        itemWidth={widthScreen - 32}
      />
      <AccountSelectorPagination accounts={savings} activeSlide={activeSlide} />
    </View>
  );
};

const AmountInput: React.FC = () => {
  const { t } = useTranslation('TransferToSaving');

  const value = useStore($amount);
  const inFocus = useStore($amountInFocus);
  const touched = useStore($amountTouched);
  const errors = useStore($amountErrors);

  return (
    <>
      <Input
        value={value}
        onChangeText={onChangeAmount}
        onFocus={focusAmount}
        onBlur={blurAmount}
        focused={inFocus}
        keyboardType="numeric"
        placeholder={t('sumForTransfer')}
        textRight={t('fullAmount')}
        onPressTextRight={chooseForFullAmount}
      />
      <InputError visible={inFocus || touched} error={errors[0]} />
    </>
  );
};

export const TransferToSaving: React.FC<TransferToSavingScreenProps> = (
  props
) => {
  const { navigation } = props;

  const [t] = useTranslation('TransferToSaving');

  React.useEffect(
    () => navigation.addListener('focus', () => focusTransferToSavingScreen()),
    [navigation]
  );

  React.useEffect(
    () => navigation.addListener('blur', () => blurTransferToSavingScreen()),
    [navigation]
  );

  const isLoading = useStore(transferToSavingRequestFx.pending);
  const isFormValid = useStore($isFormValid);
  const isBlocked = useStore($isBlockedSavingAccount);
  const isVerifiedAnd2fa = useStore($isVerifiedAnd2fa);

  return (
    <SafeAreaView style={s.sav}>
      <AKeyboardAvoidingView>
        <ScrollView style={s.sv} keyboardShouldPersistTaps="always">
          {RootNavigation.canGoBack() ? (
            <BackButton text={t('backTitle')} />
          ) : (
            <TouchableOpacity
              style={s.backButton}
              onPress={redirectToTransferMenuFx}
            >
              <Icon icon="arrowLeft" color={colors.purple500} />
              <Text style={s.backButtonText}>{t('backTitle')}</Text>
            </TouchableOpacity>
          )}
          <FromWalletPicker />
          <ToSavingPicker />
          <View style={s.box}>
            <AmountInput />

            <Button
              text={t('transfer')}
              onPress={pressSubmit}
              loading={isLoading}
              disabled={!isFormValid || isLoading || !isVerifiedAnd2fa}
              customStyle={s.button}
            />

            {isBlocked && (
              <Text style={s.alert}>{t('blockedSavingsAccountsAlert')}</Text>
            )}
          </View>
        </ScrollView>
      </AKeyboardAvoidingView>
      <VerifyCodeBottomSheet />
    </SafeAreaView>
  );
};
