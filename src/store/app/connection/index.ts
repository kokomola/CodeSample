import { NetInfoSubscription } from '@react-native-community/netinfo/lib/typescript/src/internal/types';
import { AppDomain } from '@store/app';
import { createGate } from 'effector-react';
import { Connection } from './types';

export const RootGate = createGate();

// connection

export const $isConnected = AppDomain.createStore<boolean>(true);

export const setConnected = AppDomain.createEvent<Connection>();

export const resetScreenFx = AppDomain.createEffect<void, void>();
export const reloadAppFx = AppDomain.createEffect<void, void>();

// subscription
export const $unsubsciption = AppDomain.createStore<NetInfoSubscription>(
  () => {}
);

export const subscibeConnectionFx = AppDomain.createEffect<
  void,
  NetInfoSubscription
>();

export const unsubscibeConnectionFx = AppDomain.createEffect<
  NetInfoSubscription,
  void
>();
