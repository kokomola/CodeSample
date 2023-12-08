import { AppDomain } from '@store/app';
import { combine } from 'effector';
import { createGate } from 'effector-react';
import {
  AccessToken,
  BootstrapFxDone,
  DeviceToken,
  PinSalt,
  SaveDeviceTokenFxParams,
  SavePinSaltFxParams,
} from './types';

/*
  deviceToken + pinSalt + accessToken - open app
  deviceToken + pinSalt - login pin
  deviceToken + accessToken - setup pin
  else - rm everything, open login

  если есть deviceToken и pinSalt и accessToken - открыть приложение
  если есть deviceToken и pinSalt, но нет accessToken - открыть пинпад
  в иных случаях сбрасывать все и открывать логин
 */

export const InitialScreenGate = createGate();

export const $accessToken = AppDomain.createStore<AccessToken>(null);
export const $deviceToken = AppDomain.createStore<DeviceToken>(null);
export const $pinSalt = AppDomain.createStore<PinSalt>(null);

export const setTokenToHeader = AppDomain.createEffect<AccessToken, void>();

export const $canLoginPin = combine(
  $deviceToken.map((dt) => Boolean(dt)),
  $pinSalt.map((ps) => Boolean(ps)),
  $accessToken.map((at) => Boolean(at)),
  (dt, ps, at) => dt && ps && !at
);

export const $canSetupPin = combine(
  $deviceToken.map((dt) => Boolean(dt)),
  $pinSalt.map((ps) => Boolean(ps)),
  $accessToken.map((at) => Boolean(at)),
  (dt, ps, at) => dt && !ps && at
);

export const $canOpenApp = combine(
  $deviceToken.map((dt) => Boolean(dt)),
  $pinSalt.map((ps) => Boolean(ps)),
  $accessToken.map((at) => Boolean(at)),
  (dt, ps, at) => dt && ps && at
);

export const $cantDoAnything = combine(
  $canLoginPin,
  $canSetupPin,
  $canOpenApp,
  (canLoginPin, canSetupPin, canOpenApp) =>
    !canLoginPin && !canSetupPin && !canOpenApp
);

export const saveDeviceTokenFx = AppDomain.createEffect<
  SaveDeviceTokenFxParams,
  void
>();
export const removeDeviceTokenFx = AppDomain.createEffect();

export const savePinSaltFx = AppDomain.createEffect<
  SavePinSaltFxParams,
  void
>();
export const removePinSaltFx = AppDomain.createEffect();

export const bootstrapFx = AppDomain.createEffect<void, BootstrapFxDone>();

// Debug
/* $accessToken.watch((s) => console.log('$at', s));
$deviceToken.watch((s) => console.log('$dt', s));
$pinSalt.watch((s) => console.log('$ps', s));

$canLoginPin.watch((s) => console.log('$canLoginPin', s));
$canSetupPin.watch((s) => console.log('$canSetupPin', s));
$canOpenApp.watch((s) => console.log('$canOpenApp', s));
$cantDoAnything.watch((s) => console.log('$cantDoAnything', s));
 */