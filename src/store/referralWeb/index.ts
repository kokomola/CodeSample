import { ResponseDone } from '@store/api/types';
import { ReferralLinkDomain } from '@store/app';
import { EMAIL_REGEX } from '@utils/regexes';
import { combine } from 'effector';
import { AddReferralPayload, ReferralData } from './types';

export const $referralData = ReferralLinkDomain.createStore<ReferralData>({
  code: '',
  refferal_link: '',
  refferals: [
    {
      level: 1,
      count: '',
    },
  ],
  refferalsMoney: [
    {
      root_id: 1,
      level: 1,
      fund: '',
      sum: '',
    },
  ],
  commisionsMoney: [
    {
      fund: '',
      date: '',
      type: '',
      sum: '',
    },
  ],
});

export const $email = ReferralLinkDomain.createStore<string>('');
export const onChangeEmail = ReferralLinkDomain.createEvent<string>();

export const $emailTouched = ReferralLinkDomain.createStore<boolean>(false);
export const $emailInFocus = ReferralLinkDomain.createStore<boolean>(false);
export const focusEmail = ReferralLinkDomain.createEvent<
  React.SyntheticEvent
>();
export const blurEmail = ReferralLinkDomain.createEvent<React.SyntheticEvent>();

export const pressSubmit = ReferralLinkDomain.createEvent<
  React.SyntheticEvent
>();

export const $emailErrors = combine(
  {
    required: combine($email, (email: string) => {
      return email.length === 0 ? 'TransferByEmail:emailRequired' : null;
    }),
    invalid: combine($email, (email: string) => {
      return !EMAIL_REGEX.test(email) ? 'TransferByEmail:invalidEmail' : null;
    }),
  },
  ({ required, invalid }) => [required, invalid].filter(Boolean)
);

// sunrise partner link invitation (XHR): partner's name input

export const $partnerName = ReferralLinkDomain.createStore<string>('');
export const onChangePartnerName = ReferralLinkDomain.createEvent<string>();

export const $partnerNameTouched = ReferralLinkDomain.createStore(false);
export const $partnerNameInFocus = ReferralLinkDomain.createStore(false);
export const focusPartnerName = ReferralLinkDomain.createEvent<
  React.SyntheticEvent
>();
export const blurPartnerName = ReferralLinkDomain.createEvent<
  React.SyntheticEvent
>();

export const $partnerNameErrors = combine(
  {
    required: combine($partnerName, (partner: string) => {
      return partner.length === 0 ? 'SunriseStore:nameRequired' : null;
    }),
  },
  ({ required }) => [required].filter(Boolean)
);

export const $isFormValid = combine(
  [$emailErrors, $partnerNameErrors],
  (errors) => !errors.flat().length
);

// sunrise partner link invitation (XHR)

export const $addReferralPayload = combine<AddReferralPayload>({
  email: $email,
  name: $partnerName,
});

export const addReferralEmailFx = ReferralLinkDomain.createEffect<
  AddReferralPayload,
  ResponseDone<{ code: 'ok' }>
>();

export const fetchReferralFx = ReferralLinkDomain.createEffect<
  void,
  ResponseDone<ReferralData>
>();

export const $isLoading = combine(
  {
    referral: fetchReferralFx.pending,
  },
  ({ referral }) => referral
);

// $referralData.watch((data) => log('[$referralData]', data));
