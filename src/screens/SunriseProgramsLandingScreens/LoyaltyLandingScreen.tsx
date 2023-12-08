import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { BackButton } from '@components/layout/BackButton';
import { Button } from '@components/uikit';

import { SvgXml } from 'react-native-svg';
import { amirPuppyWithCoins } from './img/amirPuppyWithCoins';
import { amirPuppyWithGifts } from './img/amirPuppyWithGifts';
import { SunriseProgramsCardSlider } from '@components/SunriseProgramsCardSlider';

import { sunriseProgramsFullMap } from '@utils/sunriseMaps';

import { styles as s } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { routes } from 'src/navigator/routes';

interface ILoyaltyLandingScreen {
  navigation: StackNavigationProp<ParamListBase>;
}
export const LoyaltyLandingScreen: React.FC<ILoyaltyLandingScreen> = (
  props
) => {
  const { navigation } = props;
  const [t] = useTranslation('LoyaltyLandingScreen');

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('shortTitle')} />

      <ScrollView style={s.sv}>
        <Text style={s.titleMain}>{t('title')}</Text>
        <Text style={s.text}>{t('shortInfo')}</Text>

        <View style={s.amirPuppyMockBox}>
          <SvgXml xml={amirPuppyWithCoins} />
        </View>

        <Text style={s.title}>{t('howItWorksTitle')}</Text>
        <Text style={s.text}>{t('howItWorksText')}</Text>
        <Text style={s.title}>{t('programLevelsTitle')}</Text>

        <SunriseProgramsCardSlider
          sunriseProgramsFullMap={sunriseProgramsFullMap(t)}
          programType="default"
        />

        <View style={s.amirPuppyMockBox}>
          <SvgXml xml={amirPuppyWithGifts} />
        </View>

        <Text style={s.title}>{t('getUSDTTitle')}</Text>
        <Text style={s.text}>{t('getUSDTText')}</Text>

        <View style={s.buttonContainer}>
          <Button
            text={t('moreAboutSunrise')}
            onPress={() => navigation.navigate(routes.sunriseTab.landing)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
