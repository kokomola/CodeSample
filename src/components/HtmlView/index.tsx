import React from 'react';
import { isAndroid, widthScreen as ws } from '@constants/platform';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import * as colors from '@constants/colors';
import { View } from 'react-native';

export const generateHtml = (content: string) => `
<!DOCTYPE html>\n
<html>
<head>
  <title>Web View</title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=${ws - 18}, user-scalable=no">
      <style type="text/css">
      html{
          height: 100%;
        }
        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          font-family: sans-serif;
        }
        p {
          margin: 5px;
          color: ${colors.space900};
          font-size: 15px;
        }
        strong {
          display: block;
          margin: 22px 0 14px;
          color: #14121e;
          font-size: 15px;
        }
        .title {
          margin: 0 0 14px;
        }
      </style>
    </head>
    <body>
      ${content}
    </body>
  </html>`;

export const HtmlView: React.FC<{
  html: string;
  height?: number;
  navigation?: any;
}> = ({ html, height = 10, navigation }) => {
  const [webViewHeight, setWebViewHeight] = React.useState(0);
  const [isInteractEnd, setIsInteractEnd] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('transitionEnd', () => {
      // do something
      setIsInteractEnd(true);
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      // do something
      setIsInteractEnd(false);
    });
  });

  const content = html.replace('<strong>', '<strong class="title">');

  const timeout = isAndroid ? 350 : 0;

  return isInteractEnd ? (
    <View renderToHardwareTextureAndroid={true}>
      <WebView
        style={{ height: height + webViewHeight }}
        scalesPageToFit={isAndroid}
        bounces={false}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        androidHardwareAccelerationDisabled={isAndroid}
        androidLayerType="hardware"
        onMessage={(event: WebViewMessageEvent) => {
          setWebViewHeight(Number(event.nativeEvent.data));
        }}
        source={{
          html: generateHtml(content),
        }}
        injectedJavaScript={`setTimeout(()=>window.ReactNativeWebView.postMessage(document.body.clientHeight),${timeout})`}
      />
    </View>
  ) : null;
};
