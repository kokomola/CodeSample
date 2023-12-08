import * as React from 'react';
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  split,
} from 'effector';
import { EMAIL_REGEX } from '@utils/regexes';

export const $newEmail = createStore<string>('');

export const changeNewEmail = createEvent<string>();

export const $newEmailInFocus = createStore<boolean>(false);

export const $newEmailTouched = createStore<boolean>(false);

export const focusNewEmail = createEvent<React.SyntheticEvent>();

export const blurNewEmail = createEvent<React.SyntheticEvent>();

type Form = {
  email: string;
};

export const $form = combine<Form>({
  email: $newEmail,
});

export const submit = createEvent<React.SyntheticEvent>();

export const changeEmailFx = createEffect<Form, void>();
export const redirectToSettingsFx = createEffect();

// TODO handle E-mail errors
export const changeEmailErrors = split(changeEmailFx.fail, {});

// TODO i18n errors
export const $newEmailErrors = combine(
  {
    required: $newEmail.map((email) =>
      email.length === 0 ? 'ChangeEmailForm:emailRequired' : null
    ),
    invalid: $newEmail.map((email) =>
      !EMAIL_REGEX.test(email) ? 'ChangeEmailForm:invalidEmail' : null
    ),
  },
  ({ required, invalid }) => [required, invalid].filter(Boolean)
);

export const $isFormValid = combine(
  [$newEmailErrors],
  (errors) => !errors.flat().length
);
