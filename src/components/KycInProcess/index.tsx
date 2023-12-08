import React from 'react';
import { Text } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { $isInProcess } from '@store/kyc';

export const KycInProcess: React.FC = () => {
  const [t] = useTranslation('KYCScreen');
  const isInProcess = useStore($isInProcess);

  if (!isInProcess) return null;

  return <Text>{t('inProcess')}</Text>;
};
