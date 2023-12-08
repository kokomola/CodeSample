import React, { FC } from 'react';
import {
  WebView,
  WebViewMessageEvent,
  WebViewProps,
} from 'react-native-webview';
import { widthScreen as ws } from '@constants/platform';
import { logline } from '@utils/debug';

interface IProps extends WebViewProps {
  scriptFile?: string;
  js?: string;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
}

export const BaseWebView: FC<IProps> = ({
  js,
  scriptFile,
  source,
  onError = (message: string) => {},
  onSuccess = (message: string) => {},
  ...props
}) => {
  const handleMessage = (e: WebViewMessageEvent) => {
    if (!e.nativeEvent.data) return null;

    const message = e.nativeEvent.data;
    const badWords = ['cancel', 'error', 'exception', 'invalid', 'expired'];
    const responseHasBadWord = badWords.reduce((acc, badWord) => {
      if (acc) return acc;
      return message.toLowerCase().includes(badWord);
    }, false);

    if (responseHasBadWord) {
      logline('GlobalPassBio webview said a bad word:', message);
      return onError(message);
    }

    //logline('', 'OKKK');
    return onSuccess(message);
  };

  const patchPostMessageFunction = () => {
    const originalPostMessage = window.postMessage;

    var patchedPostMessage = (message, targetOrigin, transfer) => {
      originalPostMessage(message, targetOrigin, transfer);
    };

    patchedPostMessage.toString = () => {
      return String(Object.hasOwnProperty).replace(
        'hasOwnProperty',
        'postMessage'
      );
    };

    window.postMessage = patchedPostMessage;
  };

  const patchPostMessageJsCode = `(${String(
    patchPostMessageFunction
  )})();${js}`;

  const scriptTag = scriptFile ? `<script src="${scriptFile}"></script>` : null;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>GlobalPass</title>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=${ws - 18}, user-scalable=no">
      ${scriptTag}
    </head>
    </html>
  `;

  return (
    <WebView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      androidLayerType="hardware"
      source={source || { html }}
      javaScriptEnabled
      injectedJavaScript={patchPostMessageJsCode}
      //injectedJavaScript={js}
      automaticallyAdjustContentInsets
      onMessage={handleMessage}
      {...props}
    />
  );
};
