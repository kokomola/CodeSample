import { closeBS } from './../bottomSheetCommon/index';
import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { showSuccess } from '@store/alert';
import i18n from '@utils/i18n';
import { combine, forward, guard, sample } from 'effector';
import {
  $verifyBottomSheetRef,
  $verifyCode,
  $verifyCodeInFocus,
  $verifyCodeTouched,
  $verifyEndpoint,
  $verifyMethod,
  $verifyPayload,
  $verifyRedirectScreen,
  $verifyRequestDomain,
  blurVerifyCode,
  changeVerifyCode,
  changeVerifyEndpoint,
  changeVerifyMethod,
  changeVerifyRedirectScreen,
  changeVerifyRequestDomain,
  closeVerifyBottomSheet,
  closeVerifyBottomSheetFx,
  focusVerifyCode,
  initVerifyBottomSheet,
  openVerifyBottomSheet,
  openVerifyBottomSheetFx,
  pressSubmitVerifyCode,
  resetVerifyCode,
  successVerifyCode,
  verifyRequest,
  verifyRequestFx,
} from './index';
import { redirectToScreenFx } from '@store/redirect';
import { signedRequest } from '@utils/agent';

$verifyEndpoint
  .on(changeVerifyEndpoint, (_, endpoint) => endpoint)
  .reset(resetVerifyCode);

$verifyRequestDomain
  .on(changeVerifyRequestDomain, (_, domainName) => domainName)
  .reset(resetVerifyCode);

$verifyBottomSheetRef
  .on(initVerifyBottomSheet, () => React.createRef<BottomSheet>())
  //.on(setVerifyBottomSheetRef, (_, ref) => ref)
  .reset(resetVerifyCode);
//.watch((code) => log('[verify/init] verify bottomoSheetref = ', !!code));

$verifyRedirectScreen
  .on(changeVerifyRedirectScreen, (_, screen) => screen)
  .reset(resetVerifyCode);

$verifyCode
  .on(changeVerifyCode, (_, code) => code)
  .reset(closeVerifyBottomSheet, verifyRequestFx.done, verifyRequestFx.fail);

$verifyMethod.on(changeVerifyMethod, (_, method) => method);

$verifyCodeInFocus
  .on(focusVerifyCode, () => true)
  .reset(
    blurVerifyCode,
    closeVerifyBottomSheet,
    verifyRequestFx.done,
    verifyRequestFx.fail
  );
$verifyCodeTouched
  .on(blurVerifyCode, () => true)
  .reset(verifyRequestFx.done, verifyRequestFx.fail, successVerifyCode);

sample({
  clock: openVerifyBottomSheet,
  source: $verifyBottomSheetRef,
  target: openVerifyBottomSheetFx,
});

openVerifyBottomSheetFx.use((bottomSheetRef) => {
  if (bottomSheetRef.current) {
    bottomSheetRef.current.expand();
  }
});

sample({
  clock: closeVerifyBottomSheet,
  source: $verifyBottomSheetRef,
  target: closeVerifyBottomSheetFx,
});

closeVerifyBottomSheetFx.use((bottomSheetRef) => {
  if (bottomSheetRef?.current) {
    bottomSheetRef.current?.close();
  }
  // use this because common bottom sheet can be opened
  closeBS(); // need delete
});

sample({
  clock: pressSubmitVerifyCode,
  source: $verifyPayload,
  target: verifyRequest,
});

sample({
  clock: verifyRequest,
  source: combine([$verifyEndpoint, $verifyMethod]),
  fn: ([endpoint, method], body) => ({
    body,
    resource: endpoint,
    method,
  }),
  target: verifyRequestFx,
});

verifyRequestFx.use(
  ({ body, resource, method = 'post' }) => {
    console.log('verifyRequestFx', { body, resource, method });
    return signedRequest({ body, method, url: resource });
  }
);

/******** Success verified code ********/

forward({
  from: verifyRequestFx.doneData,
  to: [successVerifyCode, closeVerifyBottomSheet],
});

guard({
  clock: successVerifyCode,
  source: $verifyRedirectScreen,
  filter: (screen) => !!screen,
  target: redirectToScreenFx.prepend((screen: string) => ({ screen })),
});

// success
sample({
  clock: successVerifyCode,
  source: $verifyRequestDomain,
  target: showSuccess.prepend((domain: string) => ({
    title: i18n.t(`${domain}:successTitle`),
    message: i18n.t(`${domain}:successText`),
    buttons: [{ text: 'OK' }],
  })),
  //],
});
