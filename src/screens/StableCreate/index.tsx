import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BackButton } from '@components/layout/BackButton';
import { useTranslation } from 'react-i18next';
import { Input } from '@components/uikit/Input';
import { Select } from '@components/uikit/Select';
import { Switch } from '@components/uikit/Switch';
import * as colors from '@constants/colors';
import { Icon } from '@components/uikit/Icon';
import { Button } from '@components/uikit/Button';
import { useStore } from 'effector-react';
import { fix } from '@utils/numbers/fix';
import { InputError } from '@components/uikit/InputError';
import ActionSheet from '@components/common/ActionSheet';
import { blurStableCreateScreen, focusStableCreateScreen } from '@store/app';

import { styles as s } from './styles';
import { StableSign } from '@store/stables/types';
import { AKeyboardAvoidingView } from '../AKeyboardAvoidingView';
import {
  $amountErrors,
  $amountInFocus,
  $balanceByCurrency,
  $capitalization,
  $currency,
  $finalAmountWithCap,
  $isCapitalization,
  $isFormValid,
  $monthIncome,
  $name,
  $nameErrors,
  $nameInFocus,
  $nameTouched,
  $netIncome,
  $netIncomeWithCap,
  $rateErrors,
  $strAmount,
  $year,
  blurAmount,
  blurName,
  changeCurrency,
  changeName,
  changeYear,
  createStable,
  createStableRequestFx,
  focusAmount,
  focusName,
  onChangeAmount,
  toggleIsCapitalization,
} from '@store/stables/create';
import { IScreenProps } from 'src/common/types';
import { Sign } from '@constants/funds';
import { VerifyCodeBottomSheet } from '@components/VerifyCodeBottomSheet';
import { YEARS } from '@store/stables/rates/types';
import { $rates } from '@store/stables/rates';
import { amountNormalizer } from '@utils/numbers/amountNormalizer';

const Row: React.FC<{ label: string; text: string }> = ({ label, text }) => {
  return (
    <View style={s.row}>
      <Text style={s.rowText}>{label}</Text>
      <Text style={s.rowText}>{text}</Text>
    </View>
  );
};

const InfoRows = () => {
  const { t } = useTranslation('Stable');

  const netIncome = useStore($netIncome);
  const monthIncome = useStore($monthIncome);
  const netIncomeWithCap = useStore($netIncomeWithCap);
  const finalAmountWithCap = useStore($finalAmountWithCap);
  const rates = useStore($rates);

  const capitalization = useStore($capitalization);
  const currency = useStore($currency);
  const year = useStore($year);
  const error = useStore($rateErrors);

  const selectedCurrencyBalance = useStore($balanceByCurrency);

  const sign = Sign[currency];
  //console.log({ capitalization, currency, year });
  const rate = (rates[capitalization][currency][year] * 100).toFixed(2);

  const IncomeRows = (
    <>
      <Row
        label={t('monthlyIncome')}
        text={`${fix(monthIncome, { currency })} ${sign}`}
      />
      <Row
        label={t('netIncome')}
        text={`${fix(netIncome, { currency })} ${sign}`}
      />
    </>
  );

  const IncomeRowsWithCap = (
    <>
      <Row
        label={t('finalAmount')}
        text={`${fix(finalAmountWithCap, { currency })} ${sign}`}
      />
      <Row
        label={t('netIncome')}
        text={`${fix(netIncomeWithCap, { currency })} ${sign}`}
      />
    </>
  );

  return (
    <>
      <Row
        label={t('available')}
        text={`${fix(selectedCurrencyBalance, { currency })} ${sign}`}
      />
      {capitalization ? IncomeRowsWithCap : IncomeRows}
      <Row label={t('rate')} text={`${rate}%/${t('shortMonthes')}`} />
      <InputError visible={true} error={error[0]} />
    </>
  );
};

const NameInput: React.FC = () => {
  const { t } = useTranslation('Stable');

  const value = useStore($name);
  const inFocus = useStore($nameInFocus);
  const touched = useStore($nameTouched);
  const errors = useStore($nameErrors);

  return (
    <View style={s.inputBox}>
      <Input
        value={value}
        onChangeText={changeName}
        onFocus={focusName}
        onBlur={blurName}
        placeholder={t('nameOfAccount')}
        focused={inFocus}
        autoCorrect={false}
      />
      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

const InvestmentTermSelect: React.FC = () => {
  const { t } = useTranslation('Stable');
  const monthName = t('shortMonthes');

  const year = useStore($year);

  const items = YEARS.map((term) => ({
    value: term,
    label: `${term} ${monthName}`,
  }));

  return (
    <View style={s.selectWrapper}>
      <Text style={s.label}>{t('termOfInvestment')}</Text>
      <Select
        placeholder={{}}
        value={year}
        items={items}
        onValueChange={(_year) => changeYear(_year)}
      />
    </View>
  );
};

const InvestmentTokenSelect: React.FC = () => {
  const { t } = useTranslation('Stable');

  const currency = useStore($currency);

  return (
    <View style={s.selectWrapper}>
      <Text style={s.label}>{t('cryptocurrency')}</Text>
      <Select
        placeholder={{}}
        value={currency}
        items={[
          ...Object.entries(StableSign).map(([key, value]) => ({
            value: key,
            label: value,
          })),
        ]}
        onValueChange={(_currency) => changeCurrency(_currency)}
      />
    </View>
  );
};

const AmountDepositInput: React.FC = () => {
  const { t } = useTranslation('Stable');

  const value = useStore($strAmount);
  const currency = useStore($currency);
  const inFocus = useStore($amountInFocus);
  const errors = useStore($amountErrors);

  return (
    <View style={s.inputBox}>
      <View>
        <Input
          value={value}
          onChangeText={(text) => {
            onChangeAmount(amountNormalizer(text));
          }}
          onFocus={focusAmount}
          onBlur={blurAmount}
          focused={inFocus}
          placeholder={t('depositAmount')}
          keyboardType="numeric"
        />
        <Text style={[s.placeholder]}>{Sign[currency]}</Text>
      </View>
      <InputError
        visible={true}
        error={errors[0]}
        //replace={{ amount: value, currency }}
      />
    </View>
  );
};

interface ISheetInfo {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const CapitalizationSwitch: React.FC<ISheetInfo> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  const { t } = useTranslation('Stable');
  const isCapitalization = useStore($isCapitalization);

  return (
    <>
      <View>
        <View style={s.switchWrapper}>
          <Switch
            value={Boolean(isCapitalization)}
            onValueChange={toggleIsCapitalization}
            key={Number(isCapitalization)}
          />
          <Text style={[s.switchLabel, s.text]}>
            {t('incomeCapitalization')}
          </Text>
          <TouchableOpacity onPress={onOpen}>
            <Icon
              icon="info"
              color={isOpen ? colors.purple500 : colors.space500}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ActionSheet isOpen={isOpen} onClose={onClose}>
        <View>
          <Text>{t('capitalInfo')}</Text>
        </View>
      </ActionSheet>
    </>
  );
};

export const StableCreate: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;

  const [t] = useTranslation('Stable');

  useEffect(() => {
    navigation.addListener('focus', () => focusStableCreateScreen());
    navigation.addListener('blur', () => blurStableCreateScreen());
  }, [navigation]);

  const loading = useStore(createStableRequestFx.pending);
  const [sheetInfoIsOpen, setSheetInfoState] = useState(false);
  const isFormValid = useStore($isFormValid);

  const openActionSheetInfo = () => setSheetInfoState(true);
  const closeActionSheetInfo = () => setSheetInfoState(false);

  return (
    <>
      <SafeAreaView style={s.sav}>
        <AKeyboardAvoidingView>
          <ScrollView keyboardShouldPersistTaps="always">
            <BackButton text={t('screenTitle')} />
            <View style={s.base}>
              <NameInput />
              <InvestmentTokenSelect />
              <InvestmentTermSelect />
              <AmountDepositInput />

              <CapitalizationSwitch
                isOpen={sheetInfoIsOpen}
                onOpen={openActionSheetInfo}
                onClose={closeActionSheetInfo}
              />
              <InfoRows />
              <View style={s.buttonWrapper}>
                <Button
                  text={t('buttonOpenStable')}
                  onPress={createStable}
                  disabled={!isFormValid || loading}
                  loading={loading}
                />
              </View>
            </View>
          </ScrollView>
        </AKeyboardAvoidingView>
      </SafeAreaView>
      <VerifyCodeBottomSheet />
    </>
  );
};
