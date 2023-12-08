import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { CircleIcon } from '@components/uikit/Icon';
import { ScreenTitle } from '@components/ScreenTitle';
import * as colors from '@constants/colors';

import { styles as s } from './styles';
import { TransferMenuScreenProps } from './types';
import { TransferNamedRoutes } from 'src/navigator/TransferNavigator';
import { useStore } from 'effector-react';
import { $availableTransfers, resetTransfer } from '@store/transfer';
import { $fund } from '@store/account/fund';
import { isSavings, isWallet } from '@constants/funds';
import { $selectedTokenId } from '@store/tokenSaleWallet';
import { is } from '@utils/common/condition';
import { $isVerifiedAnd2fa } from '@store/user';

export const TransferMenu: React.FC<TransferMenuScreenProps> = (props) => {
  const [t] = useTranslation('TransferMenu');

  const { navigation } = props;
  const availableTransfers = useStore($availableTransfers);
  const fund = useStore($fund);
  const selectedTokenId = useStore($selectedTokenId);

  React.useEffect(() => {
    return () => {
      resetTransfer();
    };
  }, []);

  const isVerifiedAnd2fa = useStore($isVerifiedAnd2fa);
  const isToken = is.empty(fund) && is.exist(selectedTokenId);
  const isNotToken = !isToken;
  const _isWallet = !!fund && isWallet(fund);
  const _isSavings = !!fund && isSavings(fund);

  const getColor = (not: boolean) =>
    !not ? colors.purple500 : colors.independence300;
  const getTextStyle = (not: boolean) =>
    !not ? s.buttonText : [s.buttonText, { color: getColor(not) }];

  const isDisabled =
    (!isVerifiedAnd2fa && isToken) || (!isVerifiedAnd2fa && _isSavings);

  console.log({ isVerifiedAnd2fa, isToken, _isSavings, isDisabled });

  return (
    <SafeAreaView style={s.sav}>
      <ScrollView style={s.sv}>
        <ScreenTitle title={t('screenTitle')} back />

        <View style={s.box}>
          {isNotToken && !_isSavings && (
            <TouchableOpacity
              style={s.button}
              onPress={() =>
                navigation.navigate(
                  TransferNamedRoutes.transfers.TransferConversion,
                )
              }>
              <CircleIcon icon="exchange" color={colors.purple500} inverse />
              <Text style={s.buttonText}>{t('conversion')}</Text>
            </TouchableOpacity>
          )}

          {isNotToken && (
            <TouchableOpacity
              style={s.button}
              disabled={isDisabled}
              onPress={() =>
                navigation.navigate(
                  TransferNamedRoutes.transfers.TransferToSaving,
                )
              }>
              <CircleIcon
                icon="lineChart"
                color={getColor(isDisabled)}
                inverse
              />
              <Text style={getTextStyle(isDisabled)}>{t('toSaving')}</Text>
            </TouchableOpacity>
          )}

          {isNotToken && (
            <TouchableOpacity
              style={s.button}
              disabled={isDisabled}
              onPress={() =>
                navigation.navigate(
                  TransferNamedRoutes.transfers.TransferFromSaving,
                )
              }>
              <CircleIcon icon="wallet" color={getColor(isDisabled)} inverse />
              <Text style={getTextStyle(isDisabled)}>{t('toWallet')}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={s.button}
            disabled={isDisabled}
            onPress={() =>
              navigation.navigate(TransferNamedRoutes.transfers.TransferByEmail)
            }>
            <CircleIcon icon="at" color={getColor(isDisabled)} inverse />
            <Text style={getTextStyle(isDisabled)}>{t('email')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.button}
            disabled={isDisabled}
            onPress={() =>
              navigation.navigate(TransferNamedRoutes.transfers.TransferByPhone)
            }>
            <CircleIcon icon="phone" color={getColor(isDisabled)} inverse />
            <Text style={getTextStyle(isDisabled)}>{t('phone')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
