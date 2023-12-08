import * as React from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { SvgXml } from 'react-native-svg';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { SunriseProgramsCardSlider } from '@components/SunriseProgramsCardSlider';
import { Button } from '@components/uikit';

import { sunriseProgramsFullMap } from '@utils/sunriseMaps';
import {
  blurSunriseLandingScreen,
  focusSunriseLandingScreen,
} from '@store/app';
import { amirPuppyWithRocket } from './img/amirPuppyWithRocket';
import { amirPuppyWithGifts } from './img/amirPuppyWithGifts';
import { IScreenProps } from 'src/common/types';
import { routes } from 'src/navigator/routes';
import { styles as s } from './styles';

import { openBottomSheet } from '@store/bottomSheet';
import { $didUserAgreeSunrise } from '@store/sunrise/agreement';
import { BackButton } from '@components/layout/BackButton';
import { ScreenTitle } from '@components/ScreenTitle';

export const SunriseLandingScreen: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;
  const { t } = useTranslation('SunriseLandingScreen');
  const isAgreed = useStore($didUserAgreeSunrise);

  React.useEffect(() => {
    navigation.addListener('focus', () => focusSunriseLandingScreen());
    navigation.addListener('blur', () => blurSunriseLandingScreen());
  }, [navigation]);

  return (
    <SafeAreaView style={s.sav}>
      <ScreenTitle title={t('title')} back />
      <ScrollView style={s.sv}>
        {/* <Text style={s.titleMain}>{t('title')}</Text> */}
        <Text style={s.text}>{t('shortInfo')}</Text>

        <View style={s.buttonContainer}>
          <Button
            text={isAgreed ? t('alreadyJoinedButton') : t('joinSunriseButton')}
            onPress={() => openBottomSheet()}
            disabled={isAgreed}
          />
        </View>

        <View style={s.amirPuppyMockBox}>
          <SvgXml xml={amirPuppyWithGifts} />
        </View>

        <Text style={s.title}>{t('howItWorksTitle')}</Text>
        <Text style={s.text}>{t('howItWorksText')}</Text>
        <Text style={s.title}>{t('programLevelsTitle')}</Text>

        <SunriseProgramsCardSlider
          sunriseProgramsFullMap={sunriseProgramsFullMap(t)}
          programType="sunrise"
        />

        <View style={s.amirPuppyMockBox}>
          <SvgXml xml={amirPuppyWithRocket} />
        </View>

        <Text style={s.title}>{t('becomeAmbassadorTitle')}</Text>
        <Text style={s.text}>{t('becomeAmbassadorText')}</Text>

        <View style={s.buttonContainer}>
          <Button
            text={t('figureOutMore')}
            onPress={() =>
              navigation.navigate(routes.sunriseTab.ambassadorLanding)
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
