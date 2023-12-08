import * as React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { $sollarTxs } from '@store/sollars';

import { BackButton, TxsBox } from '@components/TxHistoryLayout';
import { TxHistoryRow } from '@components/TxHistoryRow';

import { SollarWalletTxHistoryScreenProps } from './types';
import { styles as s } from './styles';

export const SollarWalletTxHistory: React.FC<SollarWalletTxHistoryScreenProps> = () => {
  const txs = useStore($sollarTxs);

  const [t] = useTranslation('SollarWalletTxHistory');

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('backButton')} />

      <TxsBox>
        <FlatList
          data={txs}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <TxHistoryRow key={item.id} tx={item} />}
          showsVerticalScrollIndicator={false}
        />
      </TxsBox>
    </SafeAreaView>
  );
};
