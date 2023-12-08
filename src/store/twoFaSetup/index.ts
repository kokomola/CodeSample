import { SyntheticEvent } from 'react';
import { combine } from 'effector';
import { $user } from '@store/user';
import { Step, TwoFaType } from './types';
import { twoFaDomain } from '@store/app';
import { logline } from '@utils/debug';
import { ResponseDone } from '@store/api/types';
import { PHONE_NUMBER_REGEX } from '@utils/regexes';

// step
export const $step = twoFaDomain.createStore<Step>('init_enable');

// button handlers
export const enableGoogle2fa = twoFaDomain.createEvent<SyntheticEvent>();
export const pressQrScanned = twoFaDomain.createEvent<SyntheticEvent>();
export const pressVerifyGoogleCode = twoFaDomain.createEvent<SyntheticEvent>();
export const enableSms2fa = twoFaDomain.createEvent<SyntheticEvent>();
export const pressVerifySmsPhone = twoFaDomain.createEvent<SyntheticEvent>();
export const pressVerifySmsCode = twoFaDomain.createEvent<SyntheticEvent>();
export const pressDisable2fa = twoFaDomain.createEvent<SyntheticEvent>();

// enable response creds
export const $qr = twoFaDomain.createStore('');
export const $secret = twoFaDomain.createStore('');

export const pressCopySecret = twoFaDomain.createEvent<void>();
export const copySecretFx = twoFaDomain.createEffect<
  { secret: string },
  void
>();

export const $qrShown = twoFaDomain.createStore(false);
export const pressShowQr = twoFaDomain.createEvent();

// phone field
export const $phone = twoFaDomain.createStore<string>('');
export const $phoneInFocus = twoFaDomain.createStore<boolean>(false);
export const $phoneTouched = twoFaDomain.createStore<boolean>(false);
export const changePhone = twoFaDomain.createEvent<string>();
export const focusPhone = twoFaDomain.createEvent<SyntheticEvent>();
export const blurPhone = twoFaDomain.createEvent<SyntheticEvent>();

export const $phoneErrors = combine(
  {
    required: $phone.map((phone) =>
      phone.length === 0 ? 'signUpFormStore:phoneRequiredError' : null
    ),
    invalid: $phone.map((phone) =>
      !PHONE_NUMBER_REGEX.test(phone)
        ? 'signUpFormStore:phoneInvalidError'
        : null
    ),
  },
  ({ required, invalid }) => [required, invalid].filter(Boolean)
);

export const $isFormValid = combine(
  [$phoneErrors],
  (errors) => !errors.flat().length
);


// sms field
export const $code = twoFaDomain.createStore<string>('');
export const $codeInFocus = twoFaDomain.createStore<boolean>(false);
export const $codeTouched = twoFaDomain.createStore<boolean>(false);
export const changeCode = twoFaDomain.createEvent<string>();
export const focusCode = twoFaDomain.createEvent<SyntheticEvent>();
export const blurCode = twoFaDomain.createEvent<SyntheticEvent>();

// status & type
export const $status = $user.map((user) => user.twofa_status);
export const $type = $user.map((user) => user.twofa_type);

export const $tfaDisabled = $status.map(
  (status) => status === 'disabled' || status === null
);
export const $tfaEnabled = $status.map((status) => status === 'enabled');
export const $tfaEnabledSms = combine(
  $status,
  $type,
  (status, type) => status === 'enabled' && type === TwoFaType.Sms
);
export const $tfaEnabledGoogle = combine(
  $status,
  $type,
  (status, type) => status === 'enabled' && type === TwoFaType.Google
);
export const $tfaPending = $status.map((status) => status === 'pending');
export const $tfaError = $status.map((status) => status === 'error');

/*** Requests 2fa ***/

export const disable2faFx = twoFaDomain.createEffect<void, ResponseDone>();
export const enable2faFx = twoFaDomain.createEffect<
  {
    phone?: string;
    type: TwoFaType;
  },
  ResponseDone<{ qrCode: string; secret: string }>
>();
export const verifyEnable2faFx = twoFaDomain.createEffect<
  {
    code: string;
    type: TwoFaType;
  },
  ResponseDone
>();
export const $detectingStatusTwoFa = combine(
  [enable2faFx.pending, disable2faFx.pending, verifyEnable2faFx.pending],
  (pendings) => pendings.some((pending) => !!pending)
);

// Redirection

export const pressRedirectToKycSetup = twoFaDomain.createEvent<
  SyntheticEvent
>();

// Debug
/* $status.watch((status) => logline('[@store/twoFA]', { status }));
$type.watch((type) => logline('[@store/twoFA]', { type }));
$status.watch((status) => logline('[@store/twoFA]', { status }));
$detectingStatusTwoFa.watch((pending) => logline('[$store/twfa]', { pending })); */
