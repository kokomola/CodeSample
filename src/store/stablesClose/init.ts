import React from 'react';
import {forward, guard, sample} from 'effector';

import {
  $bottomSheetFormRef,
  bottomSheetFormCloseFx,
  bottomSheetFormOpenFx,
  closeBottomSheetForm,
  closeStableFx,
  initBottomSheetForm,
  openBottomSheetForm,
  resetBottomSheetForm,
  submitCloseStable,
} from './index';

import {blurStableScreen, focusStableScreen} from '@store/app';

import {
  $verifyEndpoint,
  changeVerifyEndpoint,
  changeVerifyRedirectScreen,
  changeVerifyRequestDomain,
  openVerifyBottomSheet,
  resetVerifyCode,
  successVerifyCode,
} from '@store/verify';

import {fetchStables} from '@store/stables';
import {endpoints} from '@constants/endpoints';
import {initVerifyBottomSheet} from '../verify/index';
import {signedRequest} from '@utils/agent';

import BottomSheet from '@gorhom/bottom-sheet';

/** close stable */

forward({
  from: submitCloseStable,
  to: closeStableFx,
});

closeStableFx.use(async body => {
  const method = 'post';
  const url = endpoints.stable.close;

  return await signedRequest({method, url, body});
});

// Setting verification

forward({
  from: focusStableScreen,
  to: initBottomSheetForm.prepend(() => React.createRef<BottomSheet>()),
});

forward({
  from: blurStableScreen,
  to: [resetBottomSheetForm, closeBottomSheetForm],
});

forward({
  from: initBottomSheetForm,
  to: $bottomSheetFormRef,
});

sample({
  clock: openBottomSheetForm,
  source: $bottomSheetFormRef,
  target: bottomSheetFormOpenFx,
});
sample({
  clock: [closeBottomSheetForm, openVerifyBottomSheet],
  source: $bottomSheetFormRef,
  target: bottomSheetFormCloseFx,
});

bottomSheetFormOpenFx.use(ref => {
  ref?.current?.snapToIndex(1);
});
bottomSheetFormCloseFx.use(ref => {
  ref?.current?.close();
});

//verify
forward({
  from: initBottomSheetForm,
  to: [
    initVerifyBottomSheet,
    changeVerifyEndpoint.prepend(() => endpoints.stable.verifyClose),
    changeVerifyRequestDomain.prepend(() => 'CloseStable'),
    changeVerifyRedirectScreen.prepend(() => 'Accounts'),
  ],
});

forward({
  from: [resetBottomSheetForm, blurStableScreen],
  to: resetVerifyCode,
});

forward({
  from: closeStableFx.done,
  to: openVerifyBottomSheet,
});

// fetch
sample({
  clock: successVerifyCode,
  source: $verifyEndpoint,
  fn: endpoint => endpoint === endpoints.stable.verify,
  target: fetchStables,
});
