import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import { View, Text } from 'react-native';

import { format } from 'date-fns';
import { routes } from 'src/navigator/routes';

import * as Nav from '../../navigator/RootNavigation';

import { Button } from '@components/uikit';
import { SunriseCumulativeDiscounts } from '@components/SunriseCumulativeDiscounts';

import { closeBottomSheet } from '@store/bottomSheet';
import { $sunriseProgramData } from '@store/sunrise';

import { s } from './styles';
import { SunriseProfileInfoProps } from './types';

export const SunriseProfileInfo: React.FC<SunriseProfileInfoProps> = (
  props
) => {
  const { sunriseProgramsFullMap } = props;
  const [t] = useTranslation('SunriseProfileInfo');
  const { status_date: statusDate, programType, status } = useStore(
    $sunriseProgramData
  );

  // const userBenefits = sunriseProgramsFullMap[programType].find(
  //   (o) => o.level === level
  // );

  const sunriseStatus = status.charAt(0).toUpperCase() + status.slice(1);

  // 12.11.2021 - we temporarily don't show ambassador gifts
  const getSunriseOnlyBenefits = () => {
    if (programType !== 'ambassador') {
      return;
    }

    const additionalBenefits = sunriseProgramsFullMap.sunrise.find(
      (o) => o.name === sunriseStatus
    );

    return {
      benefits: additionalBenefits?.privelegesHidden,
      gifts: additionalBenefits?.giftsHidden,
    };
  };

  const sunriseProfileInfoMap = [
    {
      name: t('userStatus'),
      value: sunriseStatus,
    },
    { name: t('assignmentDate'), value: format(statusDate, 'DD.MM.YY') },
    {
      name: t('userPriveleges'),
      value: `${getSunriseOnlyBenefits()?.benefits}`,
    },
    {
      name: t('userGifts'),
      value: `${getSunriseOnlyBenefits()?.gifts}`,
      // `${userBenefits?.giftsHidden}\n ${
      //   getSunriseOnlyBenefits()?.gifts
      // }`,
    },
  ];

  return (
    <View style={s.container}>
      <Text style={s.title}>{t('profileInfo')}</Text>

      {sunriseProfileInfoMap.map((o) => (
        <View style={s.profileBox} key={o.name}>
          <Text style={s.profileText}>{o.name}</Text>
          <Text style={s.profileTextValue}>{o.value}</Text>
        </View>
      ))}

      <View style={s.profileBox}>
        <Text style={s.profileText}>{t('cumulativeDiscount')}</Text>
        <SunriseCumulativeDiscounts />
      </View>

      <View style={s.profileButton}>
        <Button
          kind="SheetButton"
          text={t('accruedPointsHistory')}
          type="primary"
          onPress={() => {
            Nav.navigate(routes.sunriseTab.discountHistory);
            closeBottomSheet();
          }}
        />
      </View>
      <Text style={s.profileSvText}>{t('pointsInfo')}</Text>
    </View>
  );
};
