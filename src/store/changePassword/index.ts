import * as React from 'react';
import { combine, createEffect, split } from 'effector';
import { PASSWORD_REGEX } from '@utils/regexes';
import { AppDomain } from '@store/app';
import { AxiosResponse } from 'axios';

export const $oldPassword = AppDomain.createStore<string>('');
export const $newPassword = AppDomain.createStore<string>('');
export const $newPasswordConfirm = AppDomain.createStore<string>('');

export const changeOldPassword = AppDomain.createEvent<string>();
export const changeNewPassword = AppDomain.createEvent<string>();
export const changeNewPasswordConfirm = AppDomain.createEvent<string>();

export const $oldPasswordInFocus = AppDomain.createStore<boolean>(false);
export const $newPasswordInFocus = AppDomain.createStore<boolean>(false);
export const $newPasswordConfirmInFocus = AppDomain.createStore<boolean>(false);

export const $oldPasswordTouched = AppDomain.createStore<boolean>(false);
export const $newPasswordTouched = AppDomain.createStore<boolean>(false);
export const $newPasswordConfirmTouched = AppDomain.createStore<boolean>(false);

export const focusOldPassword = AppDomain.createEvent<React.SyntheticEvent>();
export const focusNewPassword = AppDomain.createEvent<React.SyntheticEvent>();
export const focusNewPasswordConfirm = AppDomain.createEvent<
  React.SyntheticEvent
>();

export const blurOldPassword = AppDomain.createEvent<React.SyntheticEvent>();
export const blurNewPassword = AppDomain.createEvent<React.SyntheticEvent>();
export const blurNewPasswordConfirm = AppDomain.createEvent<
  React.SyntheticEvent
>();

type Form = {
  oldPass: string;
  password: string;
  confirm: string;
};

export const $form = combine({
  oldPass: $oldPassword,
  password: $newPassword,
  confirm: $newPasswordConfirm,
});

export const submit = AppDomain.createEvent<React.SyntheticEvent>();

export const redirectToSettingsFx = AppDomain.createEffect();

export const changePasswordFx = createEffect<Form, AxiosResponse>();

// TODO handle errors
export const changePasswordErrors = split(changePasswordFx.fail, {
  invalidPassword: ({ error }) =>
    error?.response?.data === 'not_valid_password',
});

// TODO errors
export const $oldPasswordErrors = combine(
  {
    required: $oldPassword.map((pass) =>
      pass.length === 0 ? 'ChangePasswordStore:oldPasswordRequiredError' : null
    ),
    invalid: $oldPassword.map((pass) =>
      !PASSWORD_REGEX.test(pass)
        ? 'ChangePasswordStore:oldPasswordInvalidError'
        : null
    ),
    tooShort: $oldPassword.map((pass) =>
      pass.length < 8 ? 'ChangePasswordStore:oldPasswordTooShortError' : null
    ),
  },
  ({ required, invalid, tooShort }) =>
    [required, invalid, tooShort].filter(Boolean)
);

export const $newPasswordErrors = combine(
  {
    required: $newPassword.map((pass) =>
      pass.length === 0 ? 'ChangePasswordStore:newPasswordRequiredError' : null
    ),
    invalid: $newPassword.map((pass) =>
      !PASSWORD_REGEX.test(pass)
        ? 'ChangePasswordStore:newPasswordInvalidError'
        : null
    ),
    tooShort: $newPassword.map((pass) =>
      pass.length < 8 ? 'ChangePasswordStore:newPasswordTooShortError' : null
    ),
  },
  ({ required, invalid, tooShort }) =>
    [required, invalid, tooShort].filter(Boolean)
);

export const $newPasswordConfirmErrors = combine(
  {
    required: $newPasswordConfirm.map((pass) =>
      pass.length === 0
        ? 'ChangePasswordStore:newPasswordConfirmRequiredError'
        : null
    ),
    invalid: $newPasswordConfirm.map((pass) =>
      !PASSWORD_REGEX.test(pass)
        ? 'ChangePasswordStore:newPasswordConfirmInvalidError'
        : null
    ),
    tooShort: $newPasswordConfirm.map((pass) =>
      pass.length < 8
        ? 'ChangePasswordStore:newPasswordConfirmTooShortError'
        : null
    ),
    doesntEqual: combine(
      $newPassword,
      $newPasswordConfirm,
      (pass, conf) => pass === conf
    ).map((areEqual) =>
      !areEqual ? 'ChangePasswordStore:newPasswordConfirmNotEqualError' : null
    ),
  },
  ({ required, invalid, tooShort, doesntEqual }) =>
    [required, invalid, tooShort, doesntEqual].filter(Boolean)
);

export const $isFormValid = combine(
  [$oldPasswordErrors, $newPasswordErrors, $newPasswordConfirmErrors],
  (errors) => !errors.flat().length
);
