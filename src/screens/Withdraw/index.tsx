import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import Carousel from 'react-native-snap-carousel';

import { blurWithdrawScreen, focusWithdrawScreen } from '@store/app';
import { $wallets } from '@store/wallets';
import {
  $accountIndex,
  $address,
  $addressErrors,
  $addressInFocus,
  $addressTouched,
  $amount,
  $amountErrors,
  $amountInFocus,
  $amountTouched,
  $calculatedFee,
  $fee,
  $feeType,
  $implementation,
  $isAbleToChooseFee,
  $isBEP20Selected,
  $isERC20Selected,
  $isFormValid,
  $isNotEnoughMoney,
  $isTRC20Selected,
  $selectedAccount,
  $token,
  $txFee,
  availableNetworks,
  blurAddress,
  blurAmount,
  changeAccountIndex,
  changeAddress,
  changeFee,
  changeSpeed,
  chooseForFullAmount,
  focusAddress,
  focusAmount,
  onChangeAmount,
  pressSubmitWithdraw,
  selectBEP20,
  selectERC20,
  selectTRC20,
  setToken,
  withdrawGate,
  withdrawRequestFx,
} from '@store/withdraw';
import { Wallet } from '@store/wallets/types';

import { BackButton } from '@components/layout/BackButton';
import {
  AccountSelector,
  AccountSelectorPagination,
} from '@components/uikit/AccountSelector';
import { Input } from '@components/uikit/Input';
import { InputError } from '@components/uikit/InputError';
import { Button } from '@components/uikit/Button';
import { AddressInput } from '@components/AddressInput';
import { Select } from '@components/uikit/Select';
import {
  RadioButton,
  RadioButtonsContainer,
} from '@components/uikit/RadioButtons';
import { AccentBox } from '@components/AccentBox';

import { styles as s } from './styles';
import { WithdrawScreenProps } from './types';
import { $serverConfig } from '@store/serverConfig';
import { $isCamera } from '@store/permissions';
import { Domains } from '@store/app/constants';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';
import { fixNumber } from '@utils/numbers';
import { fundToTicker } from '@utils/maps';
import { AskCameraButton } from '@components/Permission/AskCameraButton';
import { $fund } from '@store/account/fund';
import { $isPassedKyc } from '@store/user';
import { TransactionLimitExceeded } from '@components/TransactionLimitExceeded';
import { $limitPerDayInSelectedAccount } from '@store/account/limit';
import { Currency, mapFundToCurrency } from '@constants/funds';

const FundPicker: React.FC = () => {
  const wallets = useStore($wallets);
  const accountIndex = useStore($accountIndex);

  const carouselRef = React.useRef<Carousel<Wallet>>(null);

  return (
    <>
      <AccountSelector
        accounts={wallets}
        activeSlide={accountIndex}
        onSnapToItem={changeAccountIndex}
        carouselRef={carouselRef}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width - 32}
      />

      <AccountSelectorPagination
        accounts={wallets}
        activeSlide={accountIndex}
      />
    </>
  );
};

const TokenSelector: React.FC = () => {
  const [t] = useTranslation(Domains.Withdraw);
  const token = useStore($token);
  const account = useStore($selectedAccount);

  if (account?.fund !== 'usdt_wallet') {
    return null;
  }

  return (
    <View style={s.tokenSelectorBox}>
      <Text style={s.selectorLabel}>{t('token')}</Text>
      <RadioButtonsContainer>
        <RadioButton
          onPress={() => setToken('usdt')}
          text="USDT"
          icon="usdt"
          active={token === 'usdt'}
        />
        <RadioButton
          onPress={() => setToken('usdc')}
          text="USDC"
          icon="usdc"
          active={token === 'usdc'}
        />
        {/* <RadioButton
          onPress={() => setToken('busd')}
          text="BUSD"
          icon="busd"
          active={token === 'busd'}
        /> */}
      </RadioButtonsContainer>
    </View>
  );
};

const NetworkSelector: React.FC = () => {
  const [t] = useTranslation(Domains.Withdraw);
  const account = useStore($selectedAccount);
  const token = useStore($token);
  const isERC20Selected = useStore($isERC20Selected);
  const isTRC20Selected = useStore($isTRC20Selected);
  const isBEP20Selected = useStore($isBEP20Selected);

  const isAvailable = (network: 'erc20' | 'bep20' | 'trc20') =>
    availableNetworks[token as keyof typeof availableNetworks].includes(
      network,
    );

  if (account?.fund !== 'usdt_wallet') {
    return null;
  }

  return (
    <View style={s.networkSelectorBox}>
      <Text style={s.selectorLabel}>{t('network')}</Text>
      <RadioButtonsContainer>
        {isAvailable('erc20') && (
          <RadioButton
            onPress={selectERC20}
            text="ERC-20"
            active={isERC20Selected}
          />
        )}

        {isAvailable('trc20') && (
          <RadioButton
            onPress={selectTRC20}
            text="TRC-20"
            active={isTRC20Selected}
          />
        )}

        {isAvailable('bep20') && (
          <RadioButton
            onPress={selectBEP20}
            text="BEP-20"
            active={isBEP20Selected}
          />
        )}
      </RadioButtonsContainer>
    </View>
  );
};

const AmountInput: React.FC = () => {
  const { t } = useTranslation(Domains.Withdraw);
  const value = useStore($amount);
  const inFocus = useStore($amountInFocus);
  const touched = useStore($amountTouched);
  const errors = useStore($amountErrors);
  const account = useStore($selectedAccount);
  const isNotEnoughMoney = useStore($isNotEnoughMoney);
  const limit = useStore($limitPerDayInSelectedAccount);

  const ticker = fundToTicker[account?.fund as keyof typeof fundToTicker];

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
        onPressTextRight={chooseForFullAmount}
        isTextRightDisabled={isNotEnoughMoney}
        textRight={t('entireAmountBtn')}
      />

      <InputError
        visible={touched}
        error={errors[0]}
        replace={{
          fund: ticker,
          limit: fixNumber(limit, account?.fund.toLowerCase()),
        }}
      />
    </View>
  );
};

const Address: React.FC = () => {
  const [key, setKey] = React.useState(false);
  const { t } = useTranslation(Domains.Withdraw);
  const value = useStore($address);
  const inFocus = useStore($addressInFocus);
  const touched = useStore($addressTouched);
  const errors = useStore($addressErrors);

  // otherwise 'Paste' doesn't work
  React.useEffect(() => {
    const timeId = setTimeout(() => setKey(true), 100, []);
    return () => clearTimeout(timeId);
  });

  return (
    <View style={s.inputBox}>
      <AddressInput
        key={Number(key)}
        value={value}
        onChangeText={changeAddress}
        onFocus={focusAddress}
        onBlur={blurAddress}
        placeholder={t('addressPlaceholder')}
        focused={inFocus}
      />

      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

const FeePicker: React.FC = () => {
  const [t] = useTranslation(Domains.Withdraw);

  const isAbleToChooseFee = useStore($isAbleToChooseFee);
  const txFee = useStore($txFee);
  const fee = useStore($fee);
  const handleSpeedChange = (speed: 'fast' | 'fastest') => {
    const value = txFee
      ? speed === 'fast'
        ? txFee.fast
        : txFee?.fastest
      : '0';
    changeFee({
      speed,
      value,
    });

    changeSpeed(speed);
  };
  if (!isAbleToChooseFee) {
    return null;
  }

  return (
    <View style={s.inputBox}>
      <Select
        placeholder={{ label: t('feePickerPlaceholder'), value: null }}
        items={[
          { value: 'fast', label: t('feePickerFast') },
          { value: 'fastest', label: t('feePickerFastest') },
        ]}
        value={fee?.speed}
        onValueChange={(speed) => handleSpeedChange(speed)}
      />
    </View>
  );
};

export const Fee: React.FC = () => {
  const [t] = useTranslation(Domains.Withdraw);
  const fund = useStore($fund);
  const account = useStore($selectedAccount);
  const isAbleToChooseFee = useStore($isAbleToChooseFee);
  const implementation = useStore($implementation);
  const fee = useStore($fee);
  const calculatedFee = useStore($calculatedFee);
  const fixedFee = fixNumber(calculatedFee, account?.fund);

  return (
    <View style={s.fee}>
      <Text style={s.feeText}>{t('txFeeLabel')}</Text>
      <Text style={s.feeText}>
        {isAbleToChooseFee && (!implementation || !fee) ? 0 : fixedFee}{' '}
        {account?.fund === 'awt_wallet'
          ? fund
          : fundToTicker[account?.fund as keyof typeof fundToTicker]}
      </Text>
    </View>
  );
};

export const FeeDescription: React.FC = () => {
  const [t] = useTranslation(Domains.Withdraw);

  const feeType = useStore($feeType);

  if (feeType === 'btc') {
    return (
      <Text style={s.feeDescription}>
        {`${t('feeDescriptionBtc')}\n${t('btcSpeed')}`}
      </Text>
    );
  }

  if (feeType === 'eth' || feeType === 'erc20') {
    return <Text style={s.feeDescription}>{t('feeDescriptionEth')}</Text>;
  }

  return null;
};

export const TrcWarning: React.FC = () => {
  const [t] = useTranslation(Domains.Withdraw);
  const account = useStore($selectedAccount);
  const implementation = useStore($implementation);

  if (account?.fund !== 'usdt_wallet') {
    return null;
  }

  if (implementation === 'usdt_bep20') {
    return (
      <View style={s.warningBox}>
        <AccentBox>
          <Text>{t('bepWarning')}</Text>
        </AccentBox>
      </View>
    );
  }

  if (implementation === 'usdt_trc20') {
    return (
      <View style={s.warningBox}>
        <AccentBox>
          <Text>{t('trcWarning')}</Text>
        </AccentBox>
      </View>
    );
  }

  return null;
};

export const LimitDescription: React.FC = () => {
  const [t] = useTranslation(Domains.Withdraw);

  const config = useStore($serverConfig);

  const btcLimit = config?.btc_withdraw_limit + ' BTC /';
  const ethLimit = config?.eth_withdraw_limit + ' ETH /';
  const usdtLimit = config?.usdt_withdraw_limit + ' USDT';
  const limits = ''.concat(btcLimit, ethLimit, usdtLimit);

  return (
    <>
      <Text style={s.feeDescription}>{`${t(
        'order_withdrawal',
      )} ${limits}`}</Text>
    </>
  );
};

export const Withdraw: React.FC<WithdrawScreenProps> = (props) => {
  const { navigation, route } = props;
  useGate(withdrawGate);

  const isAwt = !['btc_wallet', 'eth_wallet', 'usdt_wallet'].includes(
    route?.params?.fund,
  );

  const [t] = useTranslation(Domains.Withdraw);

  React.useEffect(
    () =>
      navigation.addListener('focus', () => {
        focusWithdrawScreen({ fund: route?.params?.fund });
        //logline('', '[Withdraw] focused');
      }),
    [navigation, route.params.fund],
  );

  React.useEffect(
    () => navigation.addListener('blur', () => blurWithdrawScreen()),
    [navigation],
  );

  const isFormValid = useStore($isFormValid);
  const isLoading = useStore(withdrawRequestFx.pending);
  //const isCamera = useStore($isCamera);
  const limit = useStore($limitPerDayInSelectedAccount);
  const fund = useStore($fund);
  const isPassedKyc = useStore($isPassedKyc);
  const currency = fund ? mapFundToCurrency[fund] : Currency.USDT;

  return (
    <SafeAreaView style={s.sav} removeClippedSubviews={false}>
      <AKeyboardAvoidingView>
        <ScrollView
          style={s.sv}
          keyboardShouldPersistTaps="always"
          removeClippedSubviews={false}>
          {/* <TestReviewTitle /> */}
          <BackButton text={t('screenTitle')} showTwoFAWarning />

          {!isAwt && <FundPicker />}
          {!isAwt && <TokenSelector />}
          {!isAwt && <NetworkSelector />}
          <AmountInput />
          <Address />
          <FeePicker />
          <Fee />
          <FeeDescription />

          {/* <LimitDescription /> */}

          <TrcWarning />

          <View style={s.buttonBox}>
            {/* <AskCameraButton /> */}
            {/* isCamera && ( */}
            <Button
              text={t('submitWithdrawButtonText')}
              onPress={pressSubmitWithdraw}
              loading={isLoading}
              //disabled={!isFormValid || !isCamera}
              disabled={!isFormValid}
            />
          </View>
          <View style={s.buttonBox}>
            {!isAwt && !isPassedKyc && fund && (
              <Text>
                {t('limit', {
                  limit: fixNumber(limit, fund.toLowerCase()),
                  currency,
                })}
              </Text>
            )}
            <TransactionLimitExceeded />
          </View>
        </ScrollView>
      </AKeyboardAvoidingView>
    </SafeAreaView>
  );
};
