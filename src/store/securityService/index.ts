import { ApplicantActionId, SecurityOperation } from './types';

import { securityServiceDomain } from '../app';

// stores
export const $actionId = securityServiceDomain.createStore<number>(-1);
export const $bioToken = securityServiceDomain.createStore<string>('');

export const $applicantActionId =
  securityServiceDomain.createStore<ApplicantActionId>('');

export const $currentOperation =
  securityServiceDomain.createStore<SecurityOperation>(SecurityOperation.None);

// events
export const setActionId = securityServiceDomain.createEvent<number>();

export const setOperation =
  securityServiceDomain.createEvent<SecurityOperation>();

export const setBioToken = securityServiceDomain.createEvent<string>();

export const launchBioVerificationFx = securityServiceDomain.createEffect<
  string,
  void
>();
/* Debug */

/* $actionId.watch((actionId) => logline('[$store/securitySer]', { actionId }));
$applicantActionId.watch((applicantActionId) =>
  logline('[$store/securitySer]', { applicantActionId })
);
$token.watch((token) => logline('[$store/securitySer]', { token })); */

/* export const $token = securityServiceDomain.createStore<Token>({
  token: '',
  userId: '',
  externalActionId: '',
}); */

/* export const verifyOperation = securityServiceDomain.createEvent();
export const verificationSucceed = securityServiceDomain.createEvent();
   */

$currentOperation.watch((value) => console.log({ currentOperation: value }));
