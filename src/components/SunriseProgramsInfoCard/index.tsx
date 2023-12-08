import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { SunriseProgramsInfoCardProps } from './types';
import { s } from './styles';

export const SunriseProgramsInfoCard: React.FC<SunriseProgramsInfoCardProps> = (
  props
) => {
  const { t } = useTranslation('SunriseProgramsInfoCard');
  const {
    programType,
    icon,
    status,
    depositAmount,
    priveleges,
    gifts,
    conditions,
    //for ambassadors only:
    minLevel = '',
    monthlyReward,
    //for sunrise only:
    income,
  } = props;

  const isAmbassadorProgram = programType === 'ambassador' ? true : false;
  const isSunriseProgram = programType === 'sunrise' ? true : false;
  const isLoyaltyProgram = programType === 'default' ? true : false;

  return (
    <View style={s.cardContainer}>
      <View style={s.cardInnerBox}>
        <SvgXml xml={icon} />

        {isAmbassadorProgram ? (
          <>
            <Text style={s.title}>{status}</Text>

            <Text style={s.title}>{minLevel}</Text>
            <Text style={s.name}>{t('level')}</Text>
            <Text style={s.value}>{conditions}</Text>
            <Text style={s.name}>{t('conditionsToLevelUp')}</Text>
            <Text style={s.value}>{monthlyReward}</Text>
            <Text style={s.name}>{t('monthlyReward')}</Text>
            <Text style={s.value}>{priveleges}</Text>
            <Text style={s.name}>{t('priveleges')}</Text>
          </>
        ) : null}

        {isSunriseProgram ? (
          <>
            <Text style={s.title}>{status}</Text>

            <Text style={s.value}>{depositAmount}</Text>
            <Text style={s.name}>{t('deposit')}</Text>
            <Text style={s.value}>{conditions}</Text>
            <Text style={s.name}>{t('conditionsForStructure')}</Text>
            <Text style={s.value}>{income}</Text>
            <Text style={s.name}>{t('income')}</Text>
            <Text style={s.value}>{priveleges}</Text>
            <Text style={s.name}>{t('priveleges')}</Text>
            <Text style={s.value}>{gifts}</Text>
            <Text style={s.name}>{t('gifts')}</Text>
          </>
        ) : null}

        {isLoyaltyProgram ? (
          <>
            <Text style={s.title}>{status}</Text>

            <Text style={[s.value, s.valueBig]}>{depositAmount}</Text>
            <Text style={s.name}>{t('deposit')}</Text>
            <Text style={[s.value, s.valueBig]}>{priveleges}</Text>
            <Text style={s.name}>{t('priveleges')}</Text>
            <Text style={[s.value, s.valueBig]}>{gifts}</Text>
            <Text style={s.name}>{t('gifts')}</Text>
          </>
        ) : null}
      </View>
    </View>
  );
};
