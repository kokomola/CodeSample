import * as React from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { $incomes, fetchOperationFx } from '@store/account/income';
import { TxsBox, BackButton } from '@components/TxHistoryLayout';
import { TxHistoryRow } from '@components/TxHistoryRow';

import { styles as s } from './styles';
import { Loading } from '@components/uikit/Loading';

export const CryptoWalletTxHistory: React.FC = () => {
  const [t] = useTranslation('CryptoWalletTxHistory');

  const incomes = useStore($incomes);
  const isLoading = useStore(fetchOperationFx.pending);

  if (isLoading) {
    return <Loading size="small" />;
  }

  return (
    <SafeAreaView style={s.sav}>
      <View>
        <BackButton text={t('backButton')} />
      </View>

      <TxsBox>
        <FlatList
          data={incomes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <TxHistoryRow key={item.id} tx={item} />}
          showsVerticalScrollIndicator={false}
        />
      </TxsBox>
    </SafeAreaView>
  );
};
