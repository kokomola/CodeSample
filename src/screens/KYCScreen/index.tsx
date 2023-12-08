import React, { FC } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { BackButton } from '@components/layout/BackButton';
import { Button } from '@components/uikit/Button';

import { focusKycScreen, blurKycScreen } from '@store/app';
import {
  $detectingKyc,
  $isInProcess,
  $screeningToken,
  fetchScreeningTokenFx,
  finishKycCheck,
} from '@store/kyc';
import { $isVerifiedKyc, $needToKyc, $isGlobalPassedKyc } from '@store/user';
import { KycInProcess } from '@components/KycInProcess';
import { Loading } from '@components/uikit/Loading';
import * as Navigator from 'src/navigator/RootNavigation';
import { routes } from 'src/navigator/routes';
//import {$isCamera} from '@store/permissions';
//import {AskCameraButton} from '@components/Permission/AskCameraButton';
import { IScreenProps } from 'src/common/types';
//import { buildKYCDev, buildKYCProd } from 'rn-globalpass';
import { buildKYCDev, buildKYCProd } from 'src/utils/globalpass';
import { styles as s } from './styles';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IsDev, IsProd } from '@utils/getEnv';

const GetScreeening: FC<{ navigation: StackNavigationProp<ParamListBase> }> = ({
  navigation,
}) => {
  const [t] = useTranslation('KYCScreen');

  const needToKyc = useStore($needToKyc);
  const isInProcess = useStore($isInProcess);
  const isLoading = useStore(fetchScreeningTokenFx.pending);
  const screeningToken = useStore($screeningToken);
  //const isCamera = useStore($isCamera);

  const buildKYC = IsProd ? buildKYCProd : buildKYCDev;
  //const screeningToken = '8ca5c6ba-9751-4bf3-8a8b-cc5c0d603bde';
  //const screeningToken = '109006fc-edb1-4f30-afed-41bf3402c4e8';

  if (!needToKyc || isInProcess) return null;

  return (
    <>
      <Text>{t('descriptionText')}</Text>
      <Text>{t('lockedFeatureOne')}</Text>
      <Text>{t('lockedFeatureTwo')}</Text>
      <Text>{t('lockedFeatureThree')}</Text>

      <View style={s.buttonBox}>
        {/* <AskCameraButton /> */}
        {/*//isCamera && ( */}
        <Button
          customStyle={s.button}
          text={t('startButtonText')}
          type="primary"
          fill
          disabled={!screeningToken}
          loading={isLoading}
          //onPress={() => {}}
          onPress={async () => {
            if (screeningToken) {
              try {
                await buildKYC(screeningToken);
                finishKycCheck();
              } catch (error) {
                console.log('kyc is the end');
              }
            }
          }}
          //onPress={() => Navigator.navigate(routes.profileTab.PassKyc)}
        />
      </View>
    </>
  );
};

const IsVerified: FC = () => {
  const [t] = useTranslation('KYCScreen');

  const isVerified = useStore($isVerifiedKyc);

  if (!isVerified) return null;

  return <Text>{t('alreadyPassedText')}</Text>;
};

export const KYCScreen: FC<IScreenProps> = (props) => {
  const { navigation } = props;

  const [t] = useTranslation('KYCScreen');

  const detectingKyc = useStore($detectingKyc);
  const isInProcess = useStore($isInProcess);
  const isPassedKyc = useStore($isGlobalPassedKyc);

  React.useEffect(() => {
    navigation.addListener('focus', () => focusKycScreen());
    navigation.addListener('blur', () => blurKycScreen());
  }, [navigation]);

  if (detectingKyc) {
    return <Loading size="large" />;
  }

  return (
    <SafeAreaView style={s.sav}>
      <BackButton
        text={t('backButtonText')}
        onPress={() => {
          Navigator.goBackOrToScreen(routes.tabs.AmirWallet);
        }}
      />

      <ScrollView style={s.sv}>
        <View style={s.box}>
          {isInProcess && <KycInProcess />}

          {!isPassedKyc && <GetScreeening navigation={navigation} />}

          {isPassedKyc && <IsVerified />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
