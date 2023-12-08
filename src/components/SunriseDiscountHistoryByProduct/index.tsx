import React, { FC } from 'react';
import { Tx, TxHistoryRow } from '@components/TxHistoryRow';
import { SunriseDiscount } from '@store/sunriseDiscountHistory/types';
import { bn } from '@utils/numbers/bn';
import { Loading } from '@components/uikit/Loading';
import {
  fetchDiscountHistoryRequestFx,
  selectDiscountItem,
} from '@store/sunriseDiscountHistory';
import { useStore } from 'effector-react';
import { FlatList, TouchableOpacity } from 'react-native';
import { openBS } from '@store/bottomSheetCommon';
import { styles as s } from './styles';

export const SunriseDiscountHistoryByProduct: FC<{
  history: SunriseDiscount[];
}> = ({ history }) => {
  const isLoading = useStore(fetchDiscountHistoryRequestFx.pending);

  const toTx = (item: SunriseDiscount): Tx => {
    const isPositive = bn(item.changeAmount).isGreaterThan(0);
    return {
      amount: item.changeAmount,
      createdAt: item.changeDate,
      fund: 'sol',
      type: isPositive ? 'additional' : 'debit',
      isTime: true,
    };
  };

  const loading = isLoading ? <Loading containerStyle={s.loading} /> : null;
  return (
    <FlatList
      data={history}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => {
            selectDiscountItem(item);
            openBS('SunriseDiscountDetail');
          }}
        >
          <TxHistoryRow key={String(index)} tx={toTx(item)} />
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={loading}
    />
  );
};
