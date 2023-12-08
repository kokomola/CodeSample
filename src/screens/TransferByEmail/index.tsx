import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import {
  $amount,
  $amountErrors,
  $amountInFocus,
  $amountTouched,
  $isFormValid,
  blurAmount,
  focusAmount,
  chooseForFullAmount,
  onChangeAmount,
  $email,
  $emailInFocus,
  $emailTouched,
  onChangeEmail,
  focusEmail,
  blurEmail,
  $message,
  $messageInFocus,
  onChangeMessage,
  focusMessage,
  blurMessage,
  transferByEmailRequestFx,
  $emailErrors,
  askTransferByEmail,
} from '@store/transferByEmail';
import { widthScreen } from '@constants/platform';
import { BackButton } from '@components/layout/BackButton';
import { Button } from '@components/uikit/Button';
import { Input } from '@components/uikit/Input';
import { InputError } from '@components/uikit/InputError';
import {
  blurTransferByEmailScreen,
  focusTransferByEmailScreen,
} from '@store/app';
import { VerifyCodeBottomSheet } from '@components/VerifyCodeBottomSheet';
import { styles as s } from './styles';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';
import { fixNumber } from '@utils/numbers';
import { $isPassedKyc } from '@store/user';
import { TransactionLimitExceeded } from '@components/TransactionLimitExceeded';
import { $limitPerDayInSelectedAccount } from '@store/account/limit';
import {
  CoinSelector,
  CoinSelectorPagination,
} from '@components/uikit/CoinSelector';
import { useToken } from 'src/hooks/useSelectedToken';
import { CoinSelect } from '@components/uikit/CoinSelector/types';
import { bn } from '@utils/numbers/bn';
import { Coin } from '@components/uikit/CoinSelector/Coin';
import { $fund } from '@store/account/fund';
import { Currency, mapFundToCurrency } from '@constants/funds';
import { redirectToScreenFx } from '@store/redirect';
import { routes } from 'src/navigator/routes';
import { IScreenProps } from 'src/common/types';
import { $idx, $selectorFundCoins, changeIdx } from '@store/transfer';

const FromFundPicker: React.FC = () => {
  const activeSlide = useStore($idx);
  const carouselRef = React.useRef<typeof CoinSelector>(null);
  const coins = useStore($selectorFundCoins);

  return (
    <View style={s.as}>
      <CoinSelector
        coins={coins}
        activeSlide={activeSlide}
        onSnapToItem={changeIdx}
        carouselRef={carouselRef}
        sliderWidth={widthScreen}
        itemWidth={widthScreen - 32}
      />
      <CoinSelectorPagination coins={coins} activeSlide={activeSlide} />
    </View>
  );
};

const FromCoin = () => {
  const rawToken = useToken();
  if (!rawToken) return null;
  const { token, balance } = rawToken;

  const coinSelect: CoinSelect = {
    idx: 0,
    textBeforeTitle: 'from',
    translate: token.code,
    balance: bn(balance),
    uri: token?.image,
    color: 'white',
    coin: token.code,
  };

  return (
    <View style={s.box}>
      <Coin item={coinSelect} index={0} />
    </View>
  );
};

const EmailInput: React.FC = () => {
  const { t } = useTranslation('TransferByEmail');

  const value = useStore($email);
  const inFocus = useStore($emailInFocus);
  const touched = useStore($emailTouched);
  const errors = useStore($emailErrors);

  return (
    <>
      <Input
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeEmail}
        onFocus={focusEmail}
        onBlur={blurEmail}
        focused={inFocus}
        placeholder={t('emailPlaceholder')}
      />
      <InputError visible={inFocus || touched} error={errors[0]} />
    </>
  );
};

const AmountInput: React.FC = () => {
  const { t } = useTranslation('TransferByEmail');

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
        onPressTextRight={() => chooseForFullAmount()}
      />
      <InputError visible={inFocus || touched} error={errors[0]} />
    </>
  );
};

const MessageInput: React.FC = () => {
  const [t] = useTranslation('TransferByEmail');

  const value = useStore($message);
  const inFocus = useStore($messageInFocus);

  return (
    <>
      <Input
        value={value}
        onChangeText={onChangeMessage}
        onFocus={focusMessage}
        onBlur={blurMessage}
        focused={inFocus}
        placeholder={t('messagePlaceholder')}
        maxLength={45}
      />
    </>
  );
};

export const TransferByEmail: React.FC<IScreenProps> = ({ navigation }) => {
  const limit = useStore($limitPerDayInSelectedAccount);
  const fund = useStore($fund);
  const currency = fund ? mapFundToCurrency[fund] : Currency.USDT;

  const [t] = useTranslation('TransferByEmail');

  React.useEffect(() => {
    const unsubscrib = navigation.addListener('focus', () =>
      focusTransferByEmailScreen()
    );
    return () => {
      unsubscrib();
      blurTransferByEmailScreen();
    };
  }, [navigation]);

  const isLoading = useStore(transferByEmailRequestFx.pending);
  const isFormValid = useStore($isFormValid);
  const isPassedKyc = useStore($isPassedKyc);

  const handleBack = () =>
    redirectToScreenFx({
      rootNav: routes.tabs.AmirWallet,
      screen: 'Accounts',
    });

  return (
    <SafeAreaView style={s.sav}>
      <AKeyboardAvoidingView>
        <ScrollView style={s.sv} keyboardShouldPersistTaps="always">
          <BackButton
            text={t('backTitle')}
            onPress={handleBack}
            showTwoFAWarning
          />

          {fund ? <FromFundPicker /> : <FromCoin />}

          <View style={s.box}>
            <EmailInput />
            <AmountInput />
            <MessageInput />

            <Button
              text={t('transfer')}
              onPress={askTransferByEmail}
              loading={isLoading}
              disabled={!isFormValid || isLoading}
              customStyle={s.button}
            />
            {!isPassedKyc && fund && (
              <Text style={s.limit}>
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
      <VerifyCodeBottomSheet />
    </SafeAreaView>
  );
};
