import * as React from 'react';
import { combine } from 'effector';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '@utils/regexes';
import { passwordPolicy } from '@utils/passwordPolicies';
import { AppDomain } from '@store/app';
import { ReferralId } from '@store/referralSystem/types';

export const focusSignUpScreen = AppDomain.createEvent();
export const blurSignUpScreen = AppDomain.createEvent();

// form
export const $email = AppDomain.createStore('');
export const $password = AppDomain.createStore('');
export const $name = AppDomain.createStore('');
export const $phone = AppDomain.createStore('');
export const $referral = AppDomain.createStore<ReferralId>('');

export const $form = combine({
  email: $email,
  password: $password,
  password_repeat: $password, // legacy
  name: $name,
  phone: $phone,
  refferal: $referral, // typo error in backend
});

export const changeEmail = AppDomain.createEvent<string>();
export const changePassword = AppDomain.createEvent<string>();
export const changeName = AppDomain.createEvent<string>();
export const changePhone = AppDomain.createEvent<string>();
export const changeReferral = AppDomain.createEvent<string>();

export const submit = AppDomain.createEvent();

export const $emailInFocus = AppDomain.createStore(false);
export const $passwordInFocus = AppDomain.createStore(false);
export const $nameInFocus = AppDomain.createStore(false);
export const $phoneInFocus = AppDomain.createStore(false);
export const $referralInFocus = AppDomain.createStore(false);

export const $emailTouched = AppDomain.createStore(false);
export const $passwordTouched = AppDomain.createStore(false);
export const $nameTouched = AppDomain.createStore(false);
export const $phoneTouched = AppDomain.createStore(false);
export const $referralTouched = AppDomain.createStore(false);

export const $referralDisabled = AppDomain.createStore(false);

export const focusEmail = AppDomain.createEvent<React.SyntheticEvent>();
export const blurEmail = AppDomain.createEvent<React.SyntheticEvent>();

export const focusPassword = AppDomain.createEvent<React.SyntheticEvent>();
export const blurPassword = AppDomain.createEvent<React.SyntheticEvent>();

export const focusName = AppDomain.createEvent<React.SyntheticEvent>();
export const blurName = AppDomain.createEvent<React.SyntheticEvent>();

export const focusPhone = AppDomain.createEvent<React.SyntheticEvent>();
export const blurPhone = AppDomain.createEvent<React.SyntheticEvent>();

export const focusReferral = AppDomain.createEvent<React.SyntheticEvent>();
export const blurReferral = AppDomain.createEvent<React.SyntheticEvent>();

export const throwEmailConfirmationAlertFx = AppDomain.createEffect();

// validation
export const $emailErrors = combine(
  {
    required: $email.map((email) =>
      email.length === 0 ? 'signUpFormStore:emailRequiredError' : null
    ),
    invalid: $email.map((email) =>
      !EMAIL_REGEX.test(email) ? 'signUpFormStore:emailInvalidError' : null
    ),
  },
  ({ required, invalid }) => [required, invalid].filter(Boolean)
);

export const $passwordErrors = combine(
  {
    required: $password.map((pass) =>
      pass.length === 0 ? 'signUpFormStore:passwordRequiredError' : null
    ),
    invalid: $password.map((pass) =>
      passwordPolicy
        .missing(pass)
        .rules.some(
          (rule: { code: string; verified: boolean }) =>
            rule.code === 'shouldContain' && !rule.verified
        )
        ? 'signUpFormStore:passwordInvalidError'
        : null
    ),
    tooShort: $password.map((pass) =>
      passwordPolicy
        .missing(pass)
        .rules.some(
          (rule: { code: string; verified: boolean }) =>
            rule.code === 'lengthAtLeast' && !rule.verified
        )
        ? 'signUpFormStore:passwordInvalidError'
        : null
    ),
    identicalChars: $password.map((pass) =>
      passwordPolicy
        .missing(pass)
        .rules.some(
          (rule: { code: string; verified: boolean }) =>
            rule.code === 'identicalChars' && !rule.verified
        )
        ? 'signUpFormStore:passwordIdenticalCharsError'
        : null
    ),
  },
  ({ required, invalid, tooShort, identicalChars }) =>
    [required, invalid, tooShort, identicalChars].filter(Boolean)
);

export const $nameErrors = combine(
  {
    required: $name.map((name) =>
      name.length === 0 ? 'signUpFormStore:nameRequiredError' : null
    ),
  },
  ({ required }) => [required].filter(Boolean)
);

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
  [$emailErrors, $passwordErrors, $nameErrors, $phoneErrors],
  (errors) => !errors.flat().length
);
