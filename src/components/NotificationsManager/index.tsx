//import * as React from 'react';
//import InAppBrowser from 'react-native-inappbrowser-reborn';
//import messaging from '@react-native-firebase/messaging';

//import { sendTokenFx } from '@store/notifications';

//import { API_HOST } from '../../config';

/* export const NotificationsManager: React.FC = (props) => {
  React.useEffect(() => messaging().onTokenRefresh(() => sendTokenFx())); */

/* React.useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((notification) => {
        if (
          notification &&
          notification.data &&
          notification.data.template_id
        ) {
          InAppBrowser.open(
            `${API_HOST}/mailer/${notification.data.template_id}/template`
          );
        }
      });
  });

  React.useEffect(() =>
    messaging().onNotificationOpenedApp((notification) => {
      // console.log('onNotificationOpenedApp', notification);
      if (notification.data && notification.data.template_id) {
        InAppBrowser.open(
          `${API_HOST}/mailer/${notification.data.template_id}/template`
        );
      }
    })
  ); */

// React.useEffect(() => messaging().onMessage(console.log));

/*   return props.children;
};
 */
