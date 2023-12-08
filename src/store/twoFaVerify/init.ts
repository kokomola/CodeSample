import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { combine, forward, sample, guard } from 'effector';
import { closeBS, wasClosedBS } from '@store/bottomSheetCommon';
import {
  $code,
  $codeInFocus,
  $codeTouched,
  blurCode,
  changeCode,
  focusCode,
  launchBioVerification,
  submitCode,
  twoFaStageFx,
} from './index';
import {
  $actionId,
  $currentOperation,
  setActionId,
  setOperation,
  setBioToken,
  $bioToken,
  launchBioVerificationFx,
} from '@store/securityService';
import { SecurityOperation } from '@store/securityService/types';
import { redirectToScreenFx } from '@store/redirect';
import { routes } from 'src/navigator/routes';
import { $isVerifiedKyc } from '@store/user';
import { showSuccess } from '@store/alert';
/** TwoFaVerifyForm */

$code.on(changeCode, (_, code) => code);
$codeInFocus.on(focusCode, () => true).reset(blurCode);
$codeTouched.on(blurCode, () => true);

// 2fa stage effect

forward({
  from: wasClosedBS,
  to: changeCode.prepend(() => ''),
});

sample({
  clock: submitCode,
  source: combine({
    actionId: $actionId,
    code: $code,
  }),
  target: twoFaStageFx,
});

twoFaStageFx.use(({ actionId, code }) => {
  const method = 'post';
  const url = endpoints.securityService.verify;
  const body = { actionId, code };

  return signedRequest({ method, url, body });
});

forward({
  from: twoFaStageFx.done,
  to: closeBS,
});

forward({
  from: twoFaStageFx.doneData,
  to: [
    setActionId.prepend((response) => response.data.actionId),
    setBioToken.prepend((response) => response.data.token),
  ],
});

guard({
  clock: twoFaStageFx.doneData,
  source: combine({
    currentOperation: $currentOperation,
    isKyc: $isVerifiedKyc,
  }),
  filter: ({ currentOperation, isKyc }, { data: { code } }) =>
    code === 'ok' &&
    currentOperation === SecurityOperation.Withdraw2fa &&
    isKyc,
  target: [
    //redirectToScreenFx.prepend(() => ({ screen: routes.transfers.CheckFace })),
    launchBioVerification,
    setOperation.prepend(() => SecurityOperation.WithdrawFaceCheck),
  ],
});

guard({
  clock: launchBioVerification,
  source: $bioToken,
  filter: (source) => !!source,
  target: launchBioVerificationFx,
});

guard({
  clock: twoFaStageFx.doneData,
  source: combine({
    currentOperation: $currentOperation,
    isKyc: $isVerifiedKyc,
  }),
  filter: ({ currentOperation, isKyc }, { data: { code } }) =>
    code === 'ok' &&
    currentOperation === SecurityOperation.Withdraw2fa &&
    !isKyc,
  target: [
    redirectToScreenFx.prepend(() => ({
      rootNav: routes.tabs.AmirFinance,
      screen: routes.amirFinance.RequestHistory,
    })),
    setOperation.prepend(() => SecurityOperation.None),
    showSuccess.prepend(() => ({
      domain: 'withdrawStore',
      title: 'successWithdrawTitle',
      message: 'successWithdrawMessage',
      buttons: [{ text: 'successWithdrawOk' }],
    })),
  ],
});

/* guard({
  clock: twoFaStageFx.done,
  source: $currentOperation,
  filter: (op) => op === SecurityOperation.Withdraw2fa,
  target: [
    redirectToHome,
    fetchRequests,
    fetchWalletsFx,
    showSuccess.prepend(() => ({
      domain: 'withdrawStore',
      title: 'successWithdrawTitle',
      message: 'successWithdrawMessage',
      buttons: [{ text: 'successWithdrawOk' }],
    })),
  ],
}); */
