import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { useNavigation } from '@react-navigation/native';

import { $sunriseUserData, $sunriseProgramData } from '@store/sunrise';

import { Text } from 'react-native';
import { AccountDetailsRow } from '@components/AccountDetailsRow';

import { s } from './styles';
import { InfoRowMap } from './types';
import { routes } from '../../navigator/routes';
import { $tree } from '@store/sunriseStructure';

import { fix } from '@utils/numbers/fix';

export const SunriseUserInfoRow: React.FC = () => {
  const [t] = useTranslation('SunriseUserInfoRow');
  const navigation = useNavigation();

  const { parent, ambassador } = useStore($tree);

  const { status, programType } = useStore($sunriseProgramData);
  const {
    deposit_structure: depositStructure,
    partner_structure: partnerStructure,
    previous_month_income: previousMonthIncome,
    partners_length: partnersLength,
    activity_stats: activityStats,
  } = useStore($sunriseUserData);

  const ambassadorInfoRowMap: InfoRowMap = [
    {
      name: t('level'),
      value: status.charAt(0).toUpperCase() + status.slice(1),
    },
    {
      name: t('account'),
      value: `${fix(+depositStructure, { maxCharsAfterDot: 2 })} USDT`,
    },
    {
      name: t('accountStructure'),
      value: `${fix(+partnerStructure, { maxCharsAfterDot: 2 })} USDT`,
    },
    {
      name: t('previousMonthIncome'),
      value: `${previousMonthIncome.solar} SGC / ${previousMonthIncome.usdt} USDT`,
    },
    { name: t('numberOfPartners'), value: `${partnersLength}` },
    {
      name: t('ambassadorPartner'),
      value: ambassador?.name,
    },
    {
      name: t('partner'),
      value: parent?.name,
    },
    {
      name: t('activity'),
      value: `${activityStats.activity_progress}%`,
      onPress: () => navigation.navigate(routes.sunriseTab.ambassadorActivity),
      icon: 'chevronRight',
    },
  ];

  const sunriseInfoRowMap: InfoRowMap = [
    {
      name: t('account'),
      value: `${fix(+depositStructure, { maxCharsAfterDot: 2 })} USDT`,
    },
    {
      name: t('accountStructure'),
      value: `${fix(+partnerStructure, { maxCharsAfterDot: 2 })} USDT`,
    },
    {
      name: t('previousMonthIncome'),
      value: `${previousMonthIncome.solar} SGC / ${previousMonthIncome.usdt} USDT`,
    },
    { name: t('numberOfPartners'), value: `${partnersLength}` },
    {
      name: t('ambassadorPartner'),
      value: ambassador?.name,
    },
    { name: t('partner'), value: parent?.name },
  ];

  const chosenInfoMap =
    programType === 'ambassador' ? ambassadorInfoRowMap : sunriseInfoRowMap;

  return (
    <>
      <Text style={s.title}>{t('infoTitle')}</Text>

      {chosenInfoMap.map((info) => (
        <AccountDetailsRow
          value={info.value || '—'}
          label={info.name}
          key={info.name}
          icon={info.icon}
          onPress={info.onPress}
        />
      ))}
    </>
  );
};
