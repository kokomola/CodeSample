import * as React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import { $isPassedKyc, $isTwoFa, $userHasSecurityAlert } from '@store/user';
import { changeRequestId } from '@store/requests';
import { openBS } from '@store/bottomSheetCommon';
import { TouchableRow } from '@components/TouchableRow';
import { fundToCurrency, fundToTicker } from '@utils/maps';
import { fix } from '@utils/numbers/fix';
import { RequestHistoryRowProps } from './types';
import * as colors from '@constants/colors';
import { showRequestInfo } from '@store/requests/info';

export const RequestHistoryRow: React.FC<RequestHistoryRowProps> = (props) => {
  const { request, loading = false } = props;

  const [t] = useTranslation('requestTypes');

  const currency = fundToCurrency[request.spent_fund];
  const ticker = fundToTicker[request.spent_fund];
  const amount = fix(request.spent_amount, { currency });
  //const isPassedKyc = useStore($isPassedKyc);
  const isTwoFa = useStore($isTwoFa);

  return (
    <View key={request.id}>
      <TouchableRow
        loading={loading}
        disabled={!isTwoFa}
        onPress={() => {
          changeRequestId(request.id);
          showRequestInfo();
        }}
        primaryText={`${amount} ${ticker}`}
        smallText={t(`${request.transaction_type}`)}
        icon="exchange"
        iconColor={colors.fieryRose}
        primaryTextColor={colors.fieryRose}
        iconSize={'md'}
      />
    </View>
  );
};
