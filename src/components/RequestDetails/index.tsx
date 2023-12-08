import * as React from 'react';
import { View, Text } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { $openedRequest } from '@store/requests';
import { WithdrawToExternalWalletDetails } from './WithdrawToExternalWalletDetails';
import { TransferFromSavingDetails } from './TransferFromSavingDetails';
import { styles as s } from './styles';

export const RequestDetails: React.FC = () => {
  const [t] = useTranslation('RequestDetails');

  const renderDetails = () => {
    if (!request) return null;

    if (request.transaction_type === 'withdraw') {
      return <WithdrawToExternalWalletDetails />;
    }

    if (request.transaction_type === 'transfer') {
      return <TransferFromSavingDetails />;
    }
  };
  const request = useStore($openedRequest);

  return (
    <View style={s.container}>
      <Text style={s.title}>{t('title')}</Text>
      {renderDetails()}
    </View>
  );
};
