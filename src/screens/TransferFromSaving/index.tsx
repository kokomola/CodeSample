import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from 'effector-react';
import { ParamListBase, Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
  chooseForFullAmount,
  onChangeAmount,
  pressSubmit,
  transferFromSavingRequestFx,
} from '@store/transferFromSaving';
import { widthScreen } from '@constants/platform';
import { BackButton } from '@components/layout/BackButton';
import { Button } from '@components/uikit/Button';
import { Input } from '@components/uikit/Input';
import { InputError } from '@components/uikit/InputError';
import {
  blurTransferFromSavingScreen,
  focusTransferFromSavingScreen,
} from '@store/app';
import { VerifyCodeBottomSheet } from '@components/VerifyCodeBottomSheet';
import * as RootNavigation from '../../navigator/RootNavigation';
import { styles as s } from './styles';
import * as colors from '@constants/colors';
import { Icon } from '@components/uikit/Icon';
import { redirectToTransferMenuFx } from '@store/transfer';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';
import { $isBlockedSavingAccount } from '@store/account/permissions';
import { $isVerifiedAnd2fa } from '@store/user';

const FromSavingPicker: React.FC = () => {
  const [t] = useTranslation('TransferFromSaving');

  const savings = useStore($savings);
  const activeSlide = useStore($idx);
  const carouselRef = React.useRef<typeof AccountSelector>(null);
  return (
    <View style={s.as}>
      <AccountSelector
        textBeforeTitle={t('from')}
        accounts={savings}
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

const ToWalletPicker: React.FC = () => {
  const [t] = useTranslation('TransferFromSaving');

  const wallets = useStore($wallets);
  const activeSlide = useStore($idx);
  const carouselRef = React.useRef<typeof AccountSelector>(null);
  return (
    <View style={s.as}>
      <AccountSelector
        textBeforeTitle={t('to')}
        accounts={wallets}
        activeSlide={activeSlide}
        onSnapToItem={changeIdx}
        carouselRef={carouselRef}
        sliderWidth={widthScreen}
        itemWidth={widthScreen - 32}
      />
      <AccountSelectorPagination accounts={wallets} activeSlide={activeSlide} />
    </View>
  );
};

const AmountInput: React.FC = () => {
  const { t } = useTranslation('TransferFromSaving');

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
      <InputError visible={touched || inFocus} error={errors[0]} />
    </>
  );
};

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  route: Route<string>;
}

export const TransferFromSaving: React.FC<IProps> = (props) => {
  const { navigation } = props;

  const [t] = useTranslation('TransferFromSaving');

  React.useEffect(
    () =>
      navigation.addListener('focus', () => focusTransferFromSavingScreen()),
    [navigation],
  );

  React.useEffect(
    () => navigation.addListener('blur', () => blurTransferFromSavingScreen()),
    [navigation],
  );

  const isLoading = useStore(transferFromSavingRequestFx.pending);
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
              onPress={redirectToTransferMenuFx}>
              <Icon icon="arrowLeft" color={colors.purple500} />
              <Text style={s.backButtonText}>{t('backTitle')}</Text>
            </TouchableOpacity>
          )}

          <FromSavingPicker />
          <ToWalletPicker />
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
              <Text style={s.infoBlocked}>
                {t('blockedSavingsAccountsInfo')}
              </Text>
            )}
            {!isBlocked && (
              <>
                <Text style={s.info}>{t('transferInfoRequest')}</Text>
                <Text style={s.info}>{t('transferInfoDuration')}</Text>
                <Text>{t('duration_48h')}</Text>
                <Text>{t('duration_96h')}</Text>
                <Text>{t('duration_6days')}</Text>
                <Text>{t('duration_14days')}</Text>
              </>
            )}
          </View>
        </ScrollView>
      </AKeyboardAvoidingView>
      <VerifyCodeBottomSheet />
    </SafeAreaView>
  );
};
