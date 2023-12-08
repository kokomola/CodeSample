import { combine, createEvent } from 'effector';
import { AppDomain } from '@store/app';
import { AxiosResponse } from 'axios';
import { $deviceId } from '@store/deviceInfo';

export const focusSetupPinScreen = AppDomain.createEvent();
export const blurSetupPinScreen = createEvent();

export const $step = AppDomain.createStore('pin');
export const $salt = AppDomain.createStore('');
export const $pin = AppDomain.createStore('');
export const $confirmPin = AppDomain.createStore('');
export const $error = AppDomain.createStore('');
export const $hash = AppDomain.createStore('');
export const resetStep = AppDomain.createEvent();
export const $pinsAreEq = combine(
  $pin,
  $confirmPin,
  (pin, confirm) => pin === confirm
);

export const $form = combine({
  pin_code: $pin,
  device_id: $deviceId,
  generated_salt: $salt,
  pin_code_hash: $hash,
});

type Form = {
  pin_code: string;
  device_id: string;
  generated_salt: string;
  pin_code_hash: string;
};

export const generateSaltFx = AppDomain.createEffect<void, string>();
export const generateHashFx = AppDomain.createEffect<any, string>();

export const changePin = AppDomain.createEvent<string>();
export const changeConfirmPin = AppDomain.createEvent<string>();
export const submitPinStep = AppDomain.createEvent();
export const submitConfirmStep = AppDomain.createEvent();
export const showErrorFx = AppDomain.createEffect<void, void>();

export const setupPinFx = AppDomain.createEffect<Form, AxiosResponse>();

