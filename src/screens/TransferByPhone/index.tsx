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
  $amount,
  $amountErrors,
  $amountInFocus,
  $amountTouched,
  $isFormValid,
  blurAmount,
  focusAmount,
  chooseForFullAmount,
  onChangeAmount,
  $phone,
  $phoneInFocus,
  $phoneTouched,
  onChangePhone,
  focusPhone,
  blurPhone,
  $message,
  $messageInFocus,
  onChangeMessage,
  focusMessage,
  blurMessage,
  transferByPhoneRequestFx,
  $phoneErrors,
  askTransferByPhone,
} from '@store/transferByPhone';
import { widthScreen } from '@constants/platform';
import { BackButton } from '@components/layout/BackButton';
import { Button } from '@components/uikit/Button';
import { Input } from '@components/uikit/Input';
import { InputError } from '@components/uikit/InputError';
import {
  blurTransferByPhoneScreen,
  focusTransferByPhoneScreen,
} from '@store/app';
import { VerifyCodeBottomSheet } from '@components/VerifyCodeBottomSheet';
import * as RootNavigation from '../../navigator/RootNavigation';
import { styles as s } from './styles';
import * as colors from '@constants/colors';
import { Icon } from '@components/uikit/Icon';
import {
  $idx,
  $selectorFundCoins,
  changeIdx,
  redirectToTransferMenuFx,
} from '@store/transfer';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';
import { fixNumber } from '@utils/numbers';
import { $isPassedKyc } from '@store/user';
import { TransactionLimitExceeded } from '@components/TransactionLimitExceeded';
import { $limitPerDayInSelectedAccount } from '@store/account/limit';
import {
  CoinSelector,
  CoinSelectorPagination,
} from '@components/uikit/CoinSelector';
import { $fund } from '@store/account/fund';
import { Currency, mapFundToCurrency } from '@constants/funds';
import { useToken } from 'src/hooks/useSelectedToken';
import { CoinSelect } from '@components/uikit/CoinSelector/types';
import { Coin } from '@components/uikit/CoinSelector/Coin';
import { bn } from '@utils/numbers/bn';
import { IScreenProps } from 'src/common/types';

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

const PhoneInput: React.FC = () => {
  const { t } = useTranslation('TransferByPhone');

  const value = useStore($phone);
  const inFocus = useStore($phoneInFocus);
  const touched = useStore($phoneTouched);
  const errors = useStore($phoneErrors);

  return (
    <>
      <Input
        value={value}
        onChangeText={onChangePhone}
        onFocus={focusPhone}
        onBlur={blurPhone}
        focused={inFocus}
        keyboardType="phone-pad"
        placeholder={t('phonePlaceholder')}
      />
      <InputError visible={inFocus || touched} error={errors[0]} />
    </>
  );
};

const AmountInput: React.FC = () => {
  const { t } = useTranslation('TransferByPhone');

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
  const [t] = useTranslation('TransferByPhone');

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

export const TransferByPhone: React.FC<IScreenProps> = ({ navigation }) => {
  const limit = useStore($limitPerDayInSelectedAccount);
  const fund = useStore($fund);
  const currency = fund ? mapFundToCurrency[fund] : Currency.USDT;

  const [t] = useTranslation('TransferByPhone');

  React.useEffect(() => {
    const unsubscrib = navigation.addListener('focus', () =>
      focusTransferByPhoneScreen()
    );
    return () => {
      unsubscrib();
      blurTransferByPhoneScreen();
    };
  }, [navigation]);

  const isLoading = useStore(transferByPhoneRequestFx.pending);
  const isFormValid = useStore($isFormValid);
  const isPassedKyc = useStore($isPassedKyc);

  return (
    <SafeAreaView style={s.sav}>
      <AKeyboardAvoidingView>
        <ScrollView style={s.sv} keyboardShouldPersistTaps="always">
          {RootNavigation.canGoBack() ? (
            <BackButton text={`${t('backTitle')}`} showTwoFAWarning />
          ) : (
            <TouchableOpacity
              style={s.backButton}
              onPress={redirectToTransferMenuFx}
            >
              <Icon icon="arrowLeft" color={colors.purple500} />
              <Text style={s.backButtonText}>{t('backTitle')}</Text>
            </TouchableOpacity>
          )}

          {fund ? <FromFundPicker /> : <FromCoin />}

          <View style={s.box}>
            <PhoneInput />
            <AmountInput />
            <MessageInput />

            <Button
              text={t('transfer')}
              onPress={askTransferByPhone}
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
