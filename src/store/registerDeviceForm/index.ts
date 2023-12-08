import { AxiosResponse } from 'axios';
import * as React from 'react';
import { combine } from 'effector';
import { AppDomain } from '@store/app';

export const $token = AppDomain.createStore('');
export const $code = AppDomain.createStore('');

export const $form = combine({
  token: $token,
  code: $code,
});

type Form = {
  token: string;
  code: string;
};

export const changeCode = AppDomain.createEvent<string>();

export const submit = AppDomain.createEvent();

export const $codeInFocus = AppDomain.createStore(false);

export const $codeTouched = AppDomain.createStore(false);

export const focusCode = AppDomain.createEvent<React.SyntheticEvent>();
export const blurCode = AppDomain.createEvent<React.SyntheticEvent>();

export const registerDeviceFx = AppDomain.createEffect<
  Form,
  AxiosResponse<{ token: string; accessToken: string }>
>();

export const registerDevice = AppDomain.createEvent();
