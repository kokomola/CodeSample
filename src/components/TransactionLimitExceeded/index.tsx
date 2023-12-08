import React from 'react';
import { $limitPerDay } from '@store/account/limit';
import { $isGlobalPassedKyc } from '@store/user';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';
import { navigate } from 'src/navigator/RootNavigation';
import { routes } from 'src/navigator/routes';
import { styles as s } from './styles';
export const TransactionLimitExceeded: React.FC = () => {
  const { t } = useTranslation('TransactionLimitExceeded');
  const isGlobalPassedKyc = useStore($isGlobalPassedKyc);
  const limit = useStore($limitPerDay);

  if (isGlobalPassedKyc || limit > 0) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() =>
        navigate(routes.tabs.Settings, { screen: routes.profileTab.kycScreen })
      }
    >
      <Text style={s.text}>{t('text')}</Text>
    </TouchableOpacity>
  );
};
