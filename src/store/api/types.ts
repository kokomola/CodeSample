/* eslint-disable camelcase */
import { AxiosError, AxiosResponse, Method } from 'axios';
import { AccessToken, DeviceToken } from '@store/auth/types';

export type Fail<T = any> = {
  status?: 'failed';
  code?: 'error';
  error?:
  | string
  | {
    message: string;
    root?: {
      message: string;
      stack: string;
    };
    data?: string | T;
  };
  message?: string;
  data?: string | T;
};

export type AccountErrorCode =
  | 'registration_incorrect_email'
  | 'registration_incorrect_referral'
  | 'registration_incorrect_phone'
  | 'registration_phone_in_use'
  | 'registration_incorrect_password_policy'
  | 'registration_user_exists'
  | 'login_no_device_token'
  | 'login_invalid_sign'
  | 'login_user_not_found'
  | 'login_user_not_verified'
  | 'auth_incorrect_email'
  | 'login_incorrect_email'
  | 'incorrect_password_policy';

/******** Generic  *******/

export type ResultFail<T = any> = AxiosError<Fail<T>>;

export type ResponseDone<T = any> = {
  code?: 'ok' | 'error';
  data: {
    data: T;
  };
};

export type ResponseFail = AxiosResponse<Fail>;

// Sign up
export type SignUpRequestPayload = {
  email: string;
  password: string;
  password_repeat: string;
  name: string;
  phone: string;
  refferal?: string;
};

export type SignUpFxDone = AxiosResponse<{ code: 'ok' }>;

export type SignUpFxFail = AxiosError<{
  code: 'error';
  message: AccountErrorCode;
}>;

// Sign in
export type SignInRequestPayload = {
  email: string;
  password: string;
  captcha: string;
};

export type SignInFxDone = AxiosResponse<{ code: 'ok'; token: AccessToken }>;

export type SignInFxFail = AxiosError<{
  code: 'error';
  error: {
    status: number;
    message: AccountErrorCode;
    data?: { token: string }; // may send token if message === login_no_device_token || message === login_invalid_sign
  };
}>;
