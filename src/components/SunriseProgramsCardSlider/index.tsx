import React from 'react';
import { useTranslation } from 'react-i18next';

import { Dimensions, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SunriseProgramsInfoCard } from '@components/SunriseProgramsInfoCard';

import { styles as s } from './styles';
import { SunriseProgramsCardSliderProps } from './types';

export const SunriseProgramsCardSlider: React.FC<SunriseProgramsCardSliderProps> = (
  props
) => {
  const { t } = useTranslation('SunriseProgramsCardSlider');
  const { sunriseProgramsFullMap, programType } = props;

  const currentProgram = sunriseProgramsFullMap[programType];

  return (
    <>
      <Carousel
        slideStyle={s.carousel}
        data={currentProgram}
        renderItem={({ item }) => (
          <SunriseProgramsInfoCard
            programType={programType}
            icon={item.icon}
            priveleges={item.privileges}
            gifts={item.gifts}
            status={item.name}
            depositAmount={item.deposit}
            conditions={item.conditions}
            //for ambassador only:
            minLevel={item.minLevel}
            monthlyReward={item.monthlyReward}
            //for sunrise only:
            income={item.income}
          />
        )}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width}
        removeClippedSubviews={false}
        layout="stack"
      />
      <Text style={s.hint}>{t('hint')}</Text>
    </>
  );
};
