import { Method } from 'axios';
import {
  SignInFxDone,
  SignInFxFail,
  SignInRequestPayload,
  SignUpFxDone,
  SignUpFxFail,
  SignUpRequestPayload,
} from '@store/api/types';
import { DeviceToken, AccessToken } from '@store/auth/types';
import { AppDomain } from '../app';

export type AxiosRequestParams = {
  method: Method;
  resource: string;
  headers?: Record<string, string>;
  authorized?: boolean;
  deviceToken: DeviceToken;
  accessToken: AccessToken;
  body?: any;
};

export type Options = {
  headers?: Record<string, string>;
  authorized: boolean;
};

export const signUpRequest = AppDomain.createEvent<SignUpRequestPayload>();
export const signUpRequestFx = AppDomain.createEffect<
  SignUpRequestPayload,
  SignUpFxDone,
  SignUpFxFail
>();

export const signInRequest = AppDomain.createEvent<SignInRequestPayload>();
export const signInRequestFx = AppDomain.createEffect<
  SignInRequestPayload,
  SignInFxDone,
  SignInFxFail
>();
