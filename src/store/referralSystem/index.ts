import { ReferralLinkDomain } from './../app/index';
import { createGate } from 'effector-react';
import { ReferralId, ReferralLink, ReferralName } from './types';

export const REFERRAL_ID_STORAGE_KEY = 'REFERRAL_ID';

export const referralLinkGate = createGate();

// generate

export const $referralName = ReferralLinkDomain.createStore<string | null>(
  null
);

export const handlePressShare = ReferralLinkDomain.createEvent();

export const generateDynamicLinkFx = ReferralLinkDomain.createEffect<
  { id: ReferralId },
  { link: ReferralLink }
>();

export const shareFx = ReferralLinkDomain.createEffect<
  { link: ReferralLink },
  void
>();

// handle
export const loadReferralIdFx = ReferralLinkDomain.createEffect<
  void,
  { id: ReferralId }
>();
export const saveReferralIdFx = ReferralLinkDomain.createEffect<
  { id: ReferralId },
  void
>(); // if id doesn't exist

export const tryToCatchReferralLinkFx = ReferralLinkDomain.createEffect<
  void,
  { id: ReferralId }
>();

// referral name
export const fetchReferralNameFx = ReferralLinkDomain.createEffect<
  { id: ReferralId },
  { name: string }
>();
