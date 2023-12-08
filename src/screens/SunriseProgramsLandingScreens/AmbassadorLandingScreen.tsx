import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import { SvgXml } from 'react-native-svg';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { SunriseProgramsCardSlider } from '@components/SunriseProgramsCardSlider';
import { amirPuppyWithRocket } from './img/amirPuppyWithRocket';
import { BackButton } from '@components/layout/BackButton';
import { Button } from '@components/uikit';

import { sunriseProgramsFullMap } from '@utils/sunriseMaps';

import { closeBottomSheet, openBottomSheet } from '@store/bottomSheet';
import { BottomSheet } from '@components/BottomSheet';

import {
  blurAmbassadorLandingScreen,
  focusAmbassadorLandingScreen,
} from '@store/app';

import { agreeAmbassadorTerms } from '@store/ambassadorLandingScreen';
import { $sunriseProgramData } from '@store/sunrise';

import { styles as s } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';

// import { Alert, Linking } from 'react-native';
// import { TouchableOpacity as BottomSheetTouchableOpacity } from '@gorhom/bottom-sheet';

interface IAmbassadorLandingScreen {
  navigation: StackNavigationProp<ParamListBase>;
}
export const AmbassadorLandingScreen: React.FC<IAmbassadorLandingScreen> = (
  props
) => {
  const { navigation } = props;
  const [t] = useTranslation('AmbassadorLandingScreen');

  const { can_request: canRequest, joined } = useStore($sunriseProgramData);

  React.useEffect(
    () => navigation.addListener('focus', () => focusAmbassadorLandingScreen()),
    [navigation]
  );

  React.useEffect(
    () => navigation.addListener('blur', () => blurAmbassadorLandingScreen()),
    [navigation]
  );

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('shortTitle')} />

      <ScrollView style={s.sv}>
        <Text style={s.titleMain}>{t('title')}</Text>
        <Text style={s.text}>{t('shortInfo')}</Text>

        <View style={s.buttonContainer}>
          <Button
            text={t('applyRequestButton')}
            disabled={canRequest && joined === false ? false : true}
            onPress={() => openBottomSheet()}
          />
        </View>

        <View style={s.amirPuppyMockBox}>
          <SvgXml xml={amirPuppyWithRocket} />
        </View>

        <Text style={s.title}>{t('howToBecomeAmbassadorTitle')}</Text>
        <Text style={s.text}>{t('howToBecomeAmbassadorText')}</Text>

        <Text style={s.title}>{t('programLevelsTitle')}</Text>

        <SunriseProgramsCardSlider
          sunriseProgramsFullMap={sunriseProgramsFullMap(t)}
          programType="ambassador"
        />

        <Text style={s.ambassadorHint}>{t('programLevelsHint')}</Text>
      </ScrollView>

      <BottomSheet name="joinAmbassadorProgram">
        <View style={s.btmsheetWrapper}>
          <View style={s.btmsheetContainer}>
            <Text style={s.btmsheetTitle}>{t('joinAmbassadorTitle')}</Text>
            <Text style={s.btmsheetText}>{t('joinAmbassadorText')}</Text>

            <View style={s.btmsheetBtnBox}>
              <View style={s.btmsheetBtn}>
                <Button
                  kind="SheetButton"
                  type="secondary"
                  text={t('close')}
                  onPress={() => closeBottomSheet()}
                />
              </View>

              <View style={s.btmsheetBtn}>
                <Button
                  kind="SheetButton"
                  text={t('join')}
                  onPress={() => {
                    agreeAmbassadorTerms();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

/* <Text style={s.btmsheetText}>
              - {t('joinAmbassadorConditions')}
            </Text> */

/* <BottomSheetTouchableOpacity
              style={s.bottomSheetTouchableOpacity}
              onPress={() => handlePress(ambassadorConductCodeURL)}
            >
              <Text style={[s.link, s.btmsheetText]}>
                - {t('joinAmbassadorConductCode')}
              </Text>
            </BottomSheetTouchableOpacity> */

/* {i18n.language === 'ru-RU' ? (
              <BottomSheetTouchableOpacity
                style={s.bottomSheetTouchableOpacity}
                onPress={() => handlePress(partnerAgreementRuURL)}
              >
                <Text style={[s.link, s.btmsheetText]}>
                  - {t('joinSunriseAgreement')}
                </Text>
              </BottomSheetTouchableOpacity>
            ) : (
              <BottomSheetTouchableOpacity
                style={s.bottomSheetTouchableOpacity}
                onPress={() => handlePress(partnerAgreementEnURL)}
              >
                <Text style={[s.link, s.btmsheetText]}>
                  - {t('joinSunriseAgreement')}
                </Text>
              </BottomSheetTouchableOpacity>
            )} */

// const ambassadorConductCodeURL =
//   'https://staging.amir.capital/static/docs/ambassador_rules.pdf';

// const partnerAgreementRuURL =
//   'https://staging.amir.capital/static/docs/public_offer_ru.pdf';
// const partnerAgreementEnURL =
//   'https://staging.amir.capital/static/docs/public_offer_en.pdf';

// const handlePress = React.useCallback(
//   async (url: string) => {
//     // Checking if the link is supported for links with custom URL scheme.
//     const supported = await Linking.canOpenURL(url);

//     if (supported) {
//       // Opening the link with some app, if the URL scheme is "http" the web link should be opened
//       // by some browser in the mobile
//       await Linking.openURL(url);
//     } else {
//       Alert.alert(`${t('unsupportedURL')} ${url}`);
//     }
//   },
//   [t]
// );
