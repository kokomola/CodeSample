import * as React from 'react';
import { combine } from 'effector';
import { signInRequestFx } from '@store/api';
import { EMAIL_REGEX } from '@utils/regexes';
import { AppDomain } from '@store/app';

export const focusSignInScreen = AppDomain.createEvent();
export const blurSignInScreen = AppDomain.createEvent();

// form
export const $email = AppDomain.createStore('');
export const $password = AppDomain.createStore('');
export const $captcha = AppDomain.createStore('', { name: '$captcha' });
export const $captchaRef = AppDomain.createStore<React.Ref<any>>(null, {
  name: '$captchaRef',
});

export const $signInform = combine({
  email: $email,
  password: $password,
  captcha: $captcha,
});

export const changeEmail = AppDomain.createEvent<string>();
export const changePassword = AppDomain.createEvent<string>();
export const changeCaptcha = AppDomain.createEvent<string>();
export const changeCaptchaRef = AppDomain.createEvent<any>();

export const pressSignIn = AppDomain.createEvent();

export const $emailInFocus = AppDomain.createStore(false);
export const $passwordInFocus = AppDomain.createStore(false);

export const $emailTouched = AppDomain.createStore(false);
export const $passwordTouched = AppDomain.createStore(false);

export const focusEmail = AppDomain.createEvent<React.SyntheticEvent>();
export const blurEmail = AppDomain.createEvent<React.SyntheticEvent>();

export const focusPassword = AppDomain.createEvent<React.SyntheticEvent>();
export const blurPassword = AppDomain.createEvent<React.SyntheticEvent>();

export const $loadingCaptcha = AppDomain.createStore(false);
export const changeLoadingCaptcha = AppDomain.createEvent<boolean>();

export const openCaptcha = AppDomain.createEvent();

export const $loading = combine(
  signInRequestFx.pending,
  //$captcha.map((captcha) => !captcha),
  $loadingCaptcha.map((lc) => lc),
  (submitPending, captchaLoading) => submitPending || captchaLoading
);

// validation
export const $emailErrors = combine(
  {
    required: $email.map((email) =>
      email.length === 0 ? 'signInFormStore:emailRequiredError' : null
    ),
    invalid: $email.map((email) =>
      !EMAIL_REGEX.test(email) ? 'signInFormStore:emailInvalidError' : null
    ),
  },
  ({ required, invalid }) => [required, invalid].filter(Boolean)
);

export const $passwordErrors = combine(
  {
    required: $password.map((pass) =>
      pass.length === 0 ? 'signInFormStore:passwordRequiredError' : null
    ),
  },
  ({ required }) => [required].filter(Boolean)
);

export const $isFormValid = combine(
  [$emailErrors, $passwordErrors],
  (errors) => !errors.flat().length
);

export const $isTestAccount = AppDomain.createStore(false);
