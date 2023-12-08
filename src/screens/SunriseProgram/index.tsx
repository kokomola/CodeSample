import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {
  blurSunriseProgramScreen,
  focusSunriseProgramScreen,
} from '@store/app';
import { $isLoading, sunriseGate } from '@store/sunrise';

import { SunriseLandingScreen } from '../SunriseProgramsLandingScreens/SunriseLandingScreen';
import { SunriseLevelInfo } from '@components/SunriseLevelInfo';
import { SunriseUserInfoRow } from '@components/SunriseUserInfoRow';
import { SunriseMoreInfoBlock } from '@components/SunriseMoreInfoBlock';
import { SunriseStructure } from '@components/SunriseStructure';
import { SunriseShowContactsToggle } from '@components/SunriseShowContactsToggle';

import { purple500 } from '@constants/colors';
import { styles as s } from './styles';
import { $userV2 } from '@store/user';
import { IScreenProps } from 'src/common/types';
import { ScreenTitle } from '@components/ScreenTitle';
import { $didUserAgreeSunrise } from '@store/sunrise/agreement';
import { SunriseAgreeScreen } from '../SunriseAgreeScreen';

export const SunriseProgram: React.FC<IScreenProps> = (props) => {
  useGate(sunriseGate);

  const { navigation } = props;
  const [t] = useTranslation('SunriseProgram');

  const { loyalty_programs: loyaltyPrograms } = useStore($userV2);

  useEffect(() => {
    navigation.addListener('focus', () => focusSunriseProgramScreen());
    navigation.addListener('blur', () => blurSunriseProgramScreen());
  }, [navigation]);

  const isLoading = useStore($isLoading);
  const didUserAgreeSunriseTerms = useStore($didUserAgreeSunrise);

  if (!didUserAgreeSunriseTerms) {
    return <SunriseAgreeScreen />;
  }

  if (isLoading) {
    return (
      <View style={s.centerContainer}>
        <ActivityIndicator size="large" color={purple500} />
        <Text style={s.centerText}>{t('pendingText')}</Text>
      </View>
    );
  }

  // show landing screen if user is not Sunrise/Ambassador member or user is Ambassador but has no Sunrise program
  if (loyaltyPrograms.sunrise.joined !== true)
    return <SunriseLandingScreen navigation={navigation} />;

  return (
    <SafeAreaView style={s.sav}>
      <ScreenTitle title={t('title')} back />
      <ScrollView style={s.sv}>
        {/* <Text style={s.title}>{t('title')}</Text> */}

        <SunriseLevelInfo />

        <SunriseMoreInfoBlock
          containerStyle={s.moreInfoBlockContainer}
          navigation={navigation}
        />

        <SunriseUserInfoRow />

        <SunriseShowContactsToggle />

        <SunriseStructure />
      </ScrollView>
    </SafeAreaView>
  );
};
