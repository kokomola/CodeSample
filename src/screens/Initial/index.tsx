import * as React from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import { getBuildNumber, getVersion } from 'react-native-device-info';

import { Button } from '@components/uikit/Button';
import { bootstrapFx, InitialScreenGate } from '@store/auth';
import { IsDev } from '@utils/getEnv';
import { IScreenProps } from 'src/common/types';
import { API_HOST } from 'src/config';
import {
  InitBackgroundBottom,
  InitBackgroundTop,
  InitialAW,
  Point,
} from '@components/uikit/Icon/lib';
import { routes } from 'src/navigator/routes';
import { styles as s } from './styles';
import { isIOS } from '@constants/platform';
import { Loading } from '@components/uikit/Loading';

export const Initial: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;

  const BACKGRROUND_TOP = Image.resolveAssetSource(InitBackgroundTop).uri;
  const BACKGRROUND_BOTTOM = Image.resolveAssetSource(InitBackgroundBottom).uri;

  useGate(InitialScreenGate);
  const isDetecting = useStore(bootstrapFx.pending);
  const { t } = useTranslation('Initial');

  if (isDetecting) {
    return (
      <SafeAreaView style={s.sav}>
        <Loading size="large" />
      </SafeAreaView>
    );
  }

  const devVersion = `ver. ${getVersion()}`;
  const prodVersion = `ver. ${getVersion().substring(0, 6)}`;
  const version = IsDev ? devVersion : prodVersion;
  const build = isIOS ? ` (${getBuildNumber()})` : '';

  return (
    <SafeAreaView style={s.sav}>
      <ImageBackground
        style={s.backgroundTop}
        source={{ uri: BACKGRROUND_TOP }}
      >
        <InitialAW />
        <Text style={s.iconText}>Amir Wallet</Text>
      </ImageBackground>
      <View style={s.pointWrapper}>
        <Text style={s.pointText}>{t('exchange')}</Text>
        <Point style={s.point} width={6} height={5} />
        <Text style={s.pointText}>{t('storage')}</Text>
        <Point style={s.point} width={6} height={6} />
        <Text style={s.pointText}>{t('increase')}</Text>
      </View>
      <ImageBackground
        style={s.backgroundBottom}
        source={{ uri: BACKGRROUND_BOTTOM }}
      >
        <View style={s.box}>
          <Button
            text={t('signUp')}
            onPress={() => navigation.navigate(routes.auth.SignUp)}
          />
          <Button
            customStyle={s.buttomBox}
            text={t('signIn')}
            type="outline"
            //onPress={() => {}}
            onPress={() => navigation.navigate(routes.auth.SignIn)}
          />
        </View>
        <View style={s.versionInfo}>
          <Text style={s.hostInfo}>
            {version} {build}
          </Text>
          <Text style={s.hostInfo}>{IsDev && `${API_HOST}`}</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
