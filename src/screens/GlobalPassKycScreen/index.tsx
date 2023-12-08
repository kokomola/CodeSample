import React, { FC } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { heightScreen, isIOS, widthScreen as ws } from '@constants/platform';

import { showSuccessFx } from '@store/alert';
import { BaseWebView } from '@components/BaseWebView';
import { GLOBALPASS_KYC } from 'src/config';
import { purple500 } from '@constants/colors';
import { blurGlobalPassKycScreen, focusGlobalPassKycScreen } from '@store/app';
import { $screeningToken, finishKycCheck } from '@store/kyc';
import { logline } from '@utils/debug';
import { styles as s } from './styles';
import { MOBILE_USER_AGENT } from '@constants/webView';
import { ScreenTitle } from '@components/ScreenTitle';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export const GlobalPassKycScreen: FC<IProps> = ({ navigation }) => {
  const [loading, setLoading] = React.useState(true);
  const [t] = useTranslation('GlobalPassBio');
  const screeningToken = useStore($screeningToken);

  React.useEffect(() => {
    navigation.addListener('focus', () => focusGlobalPassKycScreen());
    navigation.addListener('blur', () => blurGlobalPassKycScreen());
    setTimeout(() => setLoading(false), 3000);
  }, [navigation]);

  if (!screeningToken) {
    showSuccessFx({ title: 'Error', message: 'There is not a token' });
    return null;
  }
  const styles = `#globalpass-container {
    overflow: scroll;
    height: ${heightScreen - 150}px;
  }`;
  const baseUrl = 'https://localhost';
  const scriptTag = `<script src="${GLOBALPASS_KYC}"></script>`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>GlobalPass</title>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=${ws - 18}, user-scalable=no">
      ${scriptTag}
    </head>
    <body>
      <div id="globalpass-container" />
    </body>
    </html>
  `;

  const js = `
    GPScreeningWidget.init({
      elementId: 'globalpass-container',
      token: '${screeningToken}',
      onComplete: () => {
        window.ReactNativeWebView.postMessage('Ok');
      },
    });
`;

  return (
    <SafeAreaView style={s.sav}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ScreenTitle title={t('backButtonText')} back />
        <BaseWebView
          source={{ html, baseUrl }}
          scrollEnabled
          //nestedScrollEnabled={true}
          js={js}
          userAgent={MOBILE_USER_AGENT}
          originWhitelist={['*']}
          mixedContentMode="always"
          bounces={true}
          domStorageEnabled={true}
          //androidLayerType="hardware"
          allowsInlineMediaPlayback
          javaScriptEnabled
          //scalesPageToFit
          mediaPlaybackRequiresUserAction={false}
          //startInLoadingState
          onSuccess={() => {
            console.log('!!!!!');
            finishKycCheck();
          }}
          onError={(message) => logline('[GlobalPassError]', message)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

/*
      <style>
        #globalpass-container {
          overflow: scroll;
          height: 500px;
        }
      </style>

      if (timeButtonId) {
        clearInterval(timeButtonId)
      }
    }, 2000);
    let isFlag = false;
    let timeButtonId = null;
    let timeScrollId = null;
    timeButtonId = setInterval(() => {
      const nextButtons = document.getElementsByClassName('gp-widget-nextButton');
      if (nextButtons.length > 0 && !isFlag) {
        isFlag = true;
        nextButtons[0].addEventListener("click", function() {
          isFlag = false;
          alert("body height " + document.body.scrollTop + " " + document.documentElement.scrollTop);
          const timerId = setTimeout(() => {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            clearTimeout(timerId);
          }, 100);
        });
      }
    }, 2000);
  */
