import React, {FC} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {heightScreen, isIOS, widthScreen as ws} from '@constants/platform';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {useStore} from 'effector-react';

import {blurGlobalPassBioScreen, focusGlobalPassBioScreen} from '@store/app';
import {finishFaceCheck} from '@store/globalPassFaceCheck';
import {$bioToken} from '@store/securityService';
import {showSuccessFx} from '@store/alert';
import {BaseWebView} from '@components/BaseWebView';
import {GLOBALPASS_BIO} from 'src/config';
import {purple500} from '@constants/colors';
import {styles as s} from './styles';
import {logline} from '@utils/debug';
import {checkReview} from '@store/review';
import {MOBILE_USER_AGENT} from '@constants/webView';
import {ScreenTitle} from '@components/ScreenTitle';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export const GlobalPassBioScreen: FC<IProps> = ({navigation}) => {
  const [loading, setLoading] = React.useState(true);
  const [t] = useTranslation('GlobalPassBio');
  const bioToken = useStore($bioToken);
  //const bioToken = '27c37d6b-e198-401e-b3a2-0ec998d52ec5';

  React.useEffect(() => {
    navigation.addListener('focus', () => focusGlobalPassBioScreen());
    navigation.addListener('blur', () => blurGlobalPassBioScreen());
    console.log(GLOBALPASS_BIO);
    setTimeout(() => setLoading(false), 3000);
  }, [navigation]);

  if (!bioToken) {
    showSuccessFx({title: 'Error', message: 'There is not a token'});
    return null;
  }

  const styles = `#globalpass-container {
    overflow: scroll;
    height: ${heightScreen - 150}px;
  }`;
  const baseUrl = 'https://localhost';
  const scriptTag = `<script src="${GLOBALPASS_BIO}"></script>`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
      ${isIOS ? styles : ''}
      </style>
      <title>GlobalPass</title>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=${ws - 18}, user-scalable=yes">
      ${scriptTag}
    </head>
    <body>
      <div id="globalpass-container" />
    </body>
    </html>
`;

  //instantBiometricsId: '${bioToken}',
  // mode: 'InstantBiometrics',
  const js = `
    GPScreeningWidget.init({
      elementId: 'globalpass-container',
      instantBiometricId: '${bioToken}',
      onComplete: () => {
          window.ReactNativeWebView.postMessage('Ok');
        },
      });
`;

  return (
    <SafeAreaView style={s.sav}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ScreenTitle title={t('backButtonText')} back />
        {loading && <ActivityIndicator size="large" color={purple500} />}
        <BaseWebView
          source={{html, baseUrl}}
          nestedScrollEnabled={true}
          js={js}
          userAgent={MOBILE_USER_AGENT}
          originWhitelist={['*']}
          mixedContentMode="always"
          bounces={true}
          domStorageEnabled={true}
          androidLayerType="hardware"
          allowsInlineMediaPlayback
          javaScriptEnabled
          scalesPageToFit
          mediaPlaybackRequiresUserAction={false}
          startInLoadingState
          onSuccess={() => {
            finishFaceCheck();
            setTimeout(checkReview, 2000);
          }}
          onError={message => logline('[GlobalPassError]', message)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
