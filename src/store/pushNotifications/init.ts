//import messaging from '@react-native-firebase/messaging';
import { tokenRefreshFx } from '@store/pushNotifications/index';
// import { forward } from 'effector';

tokenRefreshFx.use(async () => {
  /*  const apnsToken = await messaging().getAPNSToken();
  const fcmToken = await messaging().getToken();

  console.log('apns', apnsToken);
  console.log('fcm', fcmToken);

  console.log(messaging());
  console.log(messaging().onTokenRefresh());

  messaging().onTokenRefresh(() => {
    console.log('onTokenRefresh');
  });

  messaging().onMessage(() => {
    console.log('onMessage');
  }); */
});
