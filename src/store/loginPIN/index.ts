import { combine, createEvent } from 'effector';
import { $pinSalt } from '@store/auth';
import { AppDomain } from '@store/app';
import { AxiosResponse } from 'axios';
import { $deviceId } from '@store/deviceInfo';
import { logline } from '@utils/debug';

export const focusLoginPinScreen = AppDomain.createEvent();
export const blurLoginPinScreen = AppDomain.createEvent();

export const $pin = AppDomain.createStore('');
export const $hash = AppDomain.createStore('');

type Form = {
  device_id: string;
  pin_code_hash: string;
};

export const $form = combine({
  pin_code: $pin,
  generated_salt: $pinSalt,
  device_id: $deviceId,
  pin_code_hash: $hash,
});

export const changePin = AppDomain.createEvent<string>();

export const getDeviceIdFx = AppDomain.createEffect<void, string>();
export const generateHashFx = AppDomain.createEffect<any, string>();

export const submit = AppDomain.createEvent();

export const checkMobileDeviceToken = createEvent();

export const loginPinFx = AppDomain.createEffect<
  Form,
  AxiosResponse<{ token: string }>
>();

$pin.watch((pin) => logline('pin', pin));
changePin.watch((changePin) => logline('$store/loginPIN', { changePin }));
//
// $form.watch((s) => console.log('$form', s));
// loginPinFx.done.watch((s) => console.log('loginPinFx.done', s));
// loginPinFx.fail.watch((s) => console.log('loginPinFx.fail', s));
