import { guard, forward, sample } from 'effector';
import {
  $isConnected,
  setConnected,
  resetScreenFx,
  subscibeConnectionFx,
  $unsubsciption,
  reloadAppFx,
} from './index';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { RootGate, unsubscibeConnectionFx } from '@store/app/connection';
import { log, logline } from '@utils/debug';
import * as RootNav from '../../../navigator/RootNavigation';
import RNRestart from 'react-native-restart';
import { Connection } from './types';

$isConnected.on(
  setConnected,
  (_, state) =>
    state?.isConnected === true ||
    state?.isInternetReachable === true ||
    state?.isWifiEnabled === true
);

// subscribe

forward({
  from: RootGate.open,
  to: subscibeConnectionFx,
});

sample({
  clock: RootGate.close,
  source: $unsubsciption,
  to: unsubscibeConnectionFx,
});

$unsubsciption.on(
  subscibeConnectionFx.doneData,
  (preUnsubscription, unsubscription) => {
    preUnsubscription();
    return unsubscription;
  }
);

subscibeConnectionFx.use(() => {
  //logline('[Subscription]', '***');
  return NetInfo.addEventListener((state: NetInfoState) => {
    //Alert.alert('', JSON.stringify(state, null));
    setConnected(state as Connection);
  });
});

unsubscibeConnectionFx.use((unsubscription) => {
  logline('[UNSubscription]', '***');
  unsubscription();
});

guard({
  clock: $isConnected?.updates,
  filter: (_: unknown, isConnected: boolean) => isConnected,
  target: reloadAppFx,
});

reloadAppFx.use(() => {
  RNRestart.Restart();
});

resetScreenFx.use(() => {
  const route = RootNav.getCurrentRoute();
  log('', { route });
  const name = route?.name;
  const params = route?.params;
  if (name) {
    RootNav.resetRoot(name, params);
  }
});

// debug

//$isConnected.watch((c) => logline('[$store/connection]', { isConnnected: c }));

/* $subsciption.watch((subscripton) =>
  logline('[$store/app/connection]', subscripton)
);*/
