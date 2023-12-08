import { securityServiceDomain } from '@store/app';
import { AxiosResponse } from 'axios';
import { SyntheticEvent } from 'react';

export const $code = securityServiceDomain.createStore('');
export const $codeInFocus = securityServiceDomain.createStore(false);
export const $codeTouched = securityServiceDomain.createStore(false);
export const changeCode = securityServiceDomain.createEvent<string>();
export const focusCode = securityServiceDomain.createEvent<SyntheticEvent>();
export const blurCode = securityServiceDomain.createEvent<SyntheticEvent>();
export const submitCode = securityServiceDomain.createEvent<SyntheticEvent>();
export const launchBioVerification = securityServiceDomain.createEvent();

// Requests

export const twoFaStageFx = securityServiceDomain.createEffect<
  { actionId: number; code: string },
  AxiosResponse<{ code: 'ok'; actionId: number; token: string }>
>();
