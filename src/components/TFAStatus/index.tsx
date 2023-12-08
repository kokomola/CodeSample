import * as React from 'react';
import { View, Text } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import * as colors from '@constants/colors';
import { Icon } from '@components/uikit/Icon';

import {
  $tfaDisabled,
  $tfaEnabledGoogle,
  $tfaEnabledSms,
  $tfaError,
  $tfaPending,
} from '@store/twoFaSetup';

import { styles as s } from './styles';

export const TFAStatus: React.FC = () => {
  const [t] = useTranslation('TFAStatus');

  const isDisabled = useStore($tfaDisabled);
  const isSmsEnabled = useStore($tfaEnabledSms);
  const isGoogleEnabled = useStore($tfaEnabledGoogle);
  const isPending = useStore($tfaPending);
  const isError = useStore($tfaError);

  const getText = () => {
    if (isDisabled) return t('disabled');
    if (isSmsEnabled) return t('enabledPhone');
    if (isGoogleEnabled) return t('enabledApp');
    if (isPending) return t('pending');
    if (isError) return t('error');
  };

  const getIcon = () => {
    if (isDisabled) return <Icon icon="cross" color={colors.fieryRose} />;
    if (isSmsEnabled || isGoogleEnabled)
      return <Icon icon="check" color={colors.oceanGreen} />;
    if (isPending) return <Icon icon="spinner" color={colors.azure} />;
    if (isError) return <Icon icon="warning" color={colors.fieryRose} />;
  };

  return (
    <View style={s.box}>
      <Text style={s.text}>{getText()}</Text>
      {getIcon()}
    </View>
  );
};
